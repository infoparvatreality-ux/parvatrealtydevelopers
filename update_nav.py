import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

nav_old = """  // Navigate function
  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page === 'home' ? '' : `#${page}`;
  };"""

nav_new = """  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // Navigate function
  const navigateTo = (page: string, newsId?: string) => {
    setActivePage(page);
    setSelectedNewsId(newsId || null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page === 'home' ? '' : `#${page}`;
  };"""

content = content.replace(nav_old, nav_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Done")
