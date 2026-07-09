import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the single image render with a media gallery
old_media_block_1 = """                  {item.image && (
                    <div className="relative h-48 w-full">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      {item.videoLink && (
                        <a href={item.videoLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all group">
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-1" />
                          </div>
                        </a>
                      )}
                    </div>
                  )}"""

new_media_block_1 = """                  {item.media && item.media.length > 0 ? (
                    <div className="relative h-48 w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                      {item.media.map((m: any, idx: number) => (
                        <div key={idx} className="min-w-full h-full flex-shrink-0 snap-center relative">
                          {m.type.startsWith('video/') ? (
                             <video src={m.data} controls className="w-full h-full object-cover bg-black" />
                          ) : (
                             <img src={m.data} alt={item.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                      ))}
                      {item.media.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
                           {item.media.map((_: any, idx: number) => (
                              <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                           ))}
                        </div>
                      )}
                    </div>
                  ) : item.image ? (
                    <div className="relative h-48 w-full">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      {item.videoLink && (
                        <a href={item.videoLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all group">
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-1" />
                          </div>
                        </a>
                      )}
                    </div>
                  ) : null}"""

content = content.replace(old_media_block_1, new_media_block_1)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Done App.tsx")
