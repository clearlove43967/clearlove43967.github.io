"""Check built personal pages and their local links with the Python standard library."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

site = Path(sys.argv[1] if len(sys.argv) > 1 else '_site')
routes = ['index.html', 'publications/index.html', 'life/index.html',
          'publication/visbias/index.html', 'publication/comuicoder/index.html',
          'publication/knowing-but-not-doing/index.html']

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs, self.ids, self.tags = [], set(), []
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.refs.append(attrs[key])

pages = {}
for route in routes:
    path = site / route
    assert path.is_file(), f'Missing page: {path}'
    text = path.read_text()
    assert '{{' not in text and '{%' not in text, f'Unrendered Liquid: {route}'
    page = Page()
    page.feed(text)
    assert sum(tag == 'h1' for tag, attrs in page.tags) == 1, f'Expected one h1: {route}'
    assert any(tag == 'nav' and attrs.get('aria-label') for tag, attrs in page.tags)
    for tag, attrs in page.tags:
        if tag == 'img':
            assert 'alt' in attrs, f'Missing image alt: {route}'
    pages[route] = page

for route, page in pages.items():
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc or not url.path:
            continue
        target = site / unquote(url.path).lstrip('/') if url.path.startswith('/') else (site / route).parent / unquote(url.path)
        if target.is_dir():
            target /= 'index.html'
        assert target.is_file(), f'Broken local link in {route}: {ref}'

for route in ['index.html', 'publications/index.html']:
    papers = [attrs for tag, attrs in pages[route].tags if 'data-publication' in attrs]
    assert len(papers) == 3, f'Expected 3 CV publications in {route}'
    assert sum(paper['data-kind'] == 'conference' for paper in papers) == 2
    assert sum(paper['data-kind'] == 'preprint' for paper in papers) == 1

home = (site / 'index.html').read_text()
if 'map_v2.js' not in home:
    assert 'Live statistics are not enabled yet.' in home
    assert 'world-map.svg' in home
print('Passed: six pages, unique IDs, CV publications, navigation, image descriptions, local resources, and visitor-map state.')
