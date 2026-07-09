#!/bin/bash
sed -i 's/<main class="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8">/<main id="dashboard-home" class="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8">/' admin.html
sed -i 's/<button class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left flex flex-col gap-4 group">/<button onclick="openNewsModule()" class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left flex flex-col gap-4 group">/' admin.html
