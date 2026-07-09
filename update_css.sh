#!/bin/bash
if ! grep -q "hide-scrollbar" src/index.css; then
    echo "
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
" >> src/index.css
fi
