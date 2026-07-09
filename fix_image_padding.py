import sys
with open('src/App.tsx', 'r') as f:
    content = f.read()
old_tag = '                      <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 pt-6">'
new_tag = '                      <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 mt-6">'
content = content.replace(old_tag, new_tag)
with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Done")
