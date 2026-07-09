#!/bin/bash

# Replace the input fields in HTML
awk '
/<!-- News & Updates Module -->/ { inside_module=1 }
/<div class="space-y-1.5">/ && inside_module {
    if (match($0, /Cover Image URL/)) {
        skip=4
        print "                <div class=\"space-y-3 pt-2\">"
        print "                    <label class=\"block text-[10px] font-bold text-slate-700 uppercase tracking-wider\">Media Gallery (Images & Videos)</label>"
        print "                    <div id=\"media-dropzone\" class=\"border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-rose-400 transition-all cursor-pointer group relative overflow-hidden\">"
        print "                        <div class=\"w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform\">"
        print "                            <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12\"></path></svg>"
        print "                        </div>"
        print "                        <p class=\"text-xs font-bold text-slate-700\">Click or drag files to upload</p>"
        print "                        <p class=\"text-[10px] text-slate-400 mt-1\">Supports JPG, PNG, MP4</p>"
        print "                        <input type=\"file\" id=\"news-media-input\" multiple accept=\"image/*,video/*\" class=\"absolute inset-0 w-full h-full opacity-0 cursor-pointer\">"
        print "                    </div>"
        print "                    <!-- Selected files list -->"
        print "                    <div id=\"media-preview-list\" class=\"grid grid-cols-2 md:grid-cols-4 gap-3 empty:hidden mt-4\">"
        print "                        <!-- Thumbnails injected here -->"
        print "                    </div>"
        print "                </div>"
        next
    }
}
skip > 0 {
    skip--
    next
}
/<div class="space-y-1.5">/ && inside_module {
    if (match($0, /Video Link/)) {
        skip=3
        next
    }
}
{ print $0 }
' admin.html > temp.html
mv temp.html admin.html

