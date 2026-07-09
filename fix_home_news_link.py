import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_link = """                        onClick={(e) => { e.preventDefault(); navigateTo('news'); }}
                        className="text-xs text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Read Full &rarr;"""

new_link = """                        onClick={(e) => { e.preventDefault(); navigateTo('news', item.id); }}
                        className="text-xs text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Read Article &rarr;"""

content = content.replace(old_link, new_link)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Done")
