import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_news_block = """      {activePage === 'news' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block">MEDIA DESK</span>
              <h1 className="text-4xl font-serif font-bold text-white tracking-wide">LATEST CORPORATE NEWS</h1>
              <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getNews().map((item) => (
                <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col overflow-hidden">
                  {item.media && item.media.length > 0 ? (
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
                  ) : null}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] text-amber-500 font-mono tracking-widest block">{item.date}</span>
                      <h3 className="text-base font-serif font-bold text-white leading-snug">{item.title}</h3>
                      <p className="text-neutral-400 text-xs font-light leading-relaxed">{item.snippet}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-[10px] text-neutral-500 font-mono">By {item.author}</span>
                      <button className="text-neutral-500 hover:text-amber-500 transition-colors" title="Share" aria-label="Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}"""

new_news_block = """      {activePage === 'news' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950 min-h-screen">
          <div className="max-w-5xl mx-auto space-y-12">
            {!selectedNewsId ? (
              <>
                <div className="text-center space-y-4">
                  <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block">MEDIA DESK</span>
                  <h1 className="text-4xl font-serif font-bold text-white tracking-wide">LATEST CORPORATE NEWS</h1>
                  <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {getNews().map((item) => (
                    <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                      {item.media && item.media.length > 0 ? (
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
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-md p-1.5">
                              <Play className="w-4 h-4 text-amber-500" />
                            </div>
                          )}
                        </div>
                      ) : null}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[10px] text-amber-500 font-mono tracking-widest block">{item.date}</span>
                          <h3 className="text-base font-serif font-bold text-white leading-snug">{item.title}</h3>
                          <p className="text-neutral-400 text-xs font-light leading-relaxed">{item.snippet}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-neutral-800/50">
                          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">News Report</span>
                          <button onClick={(e) => { e.preventDefault(); navigateTo('news', item.id); }} className="text-xs text-amber-500 font-bold hover:underline cursor-pointer flex items-center gap-1">
                            Read Article &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              (() => {
                const item = getNews().find(n => n.id === selectedNewsId);
                if (!item) return null;
                return (
                  <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
                    <button onClick={() => setSelectedNewsId(null)} className="text-xs text-neutral-400 hover:text-white font-bold tracking-widest uppercase flex items-center gap-2 mb-8 transition-colors">
                      &larr; BACK TO NEWS
                    </button>
                    <div className="space-y-4">
                      <span className="text-amber-500 text-sm font-mono tracking-widest">{item.date}</span>
                      <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">{item.title}</h1>
                      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/50 mt-4">
                         <span className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Share:</span>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                           <Share2 className="w-3.5 h-3.5" />
                         </button>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-green-500 hover:border-green-500 transition-all" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(item.title + ' - ' + window.location.href)}`, '_blank')}>
                           <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                         </button>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-blue-500 hover:border-blue-500 transition-all" onClick={() => navigator.clipboard.writeText(window.location.href)} title="Copy Link">
                           <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                         </button>
                      </div>
                    </div>
                    
                    {item.media && item.media.length > 0 ? (
                      <div className="space-y-4 pt-6">
                        {item.media.map((m: any, idx: number) => (
                          <div key={idx} className="w-full rounded-xl overflow-hidden border border-neutral-800">
                            {m.type.startsWith('video/') ? (
                              <video src={m.data} controls className="w-full h-auto max-h-[70vh] bg-black" />
                            ) : (
                              <img src={m.data} alt={item.title} className="w-full h-auto max-h-[70vh] object-cover" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : item.image ? (
                      <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 pt-6">
                        <img src={item.image} alt={item.title} className="w-full h-auto max-h-[70vh] object-cover" />
                      </div>
                    ) : null}

                    {item.videoLink && (
                      <div className="pt-6">
                        <a href={item.videoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-neutral-950 font-bold text-sm tracking-widest uppercase rounded hover:bg-amber-400 transition-colors shadow-lg">
                          <Play className="w-5 h-5" /> Watch Video Coverage
                        </a>
                      </div>
                    )}

                    <div className="prose prose-invert prose-amber max-w-none text-neutral-300 font-light leading-relaxed pt-8 pb-12 border-t border-neutral-800/30 mt-8">
                      <p className="text-lg md:text-xl text-white font-medium mb-8 border-l-2 border-amber-500 pl-6 py-2">
                        {item.snippet}
                      </p>
                      <p>
                        The real estate landscape is continually evolving to meet the demands of modern investors who seek security, luxury, and long-term appreciation. As market dynamics shift, our commitment to delivering uncompromising quality and vetted opportunities remains steadfast.
                      </p>
                      <p className="mt-4">
                        This update highlights our proactive measures and upcoming initiatives designed to enhance the value of your portfolio. By leveraging cutting-edge market analysis and maintaining rigorous legal standards, we ensure that every property we curate offers exceptional peace of mind.
                      </p>
                      <p className="mt-4 text-neutral-400 italic">
                        For further details or to discuss how this news impacts your specific investments, please reach out to our advisory team.
                      </p>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </section>
      )}"""

if old_news_block in content:
    content = content.replace(old_news_block, new_news_block)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Done")
else:
    print("Could not find the block to replace.")

