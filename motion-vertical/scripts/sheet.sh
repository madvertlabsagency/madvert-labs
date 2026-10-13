#!/bin/sh
# Contact sheet of vertical stills (4 columns): scripts/sheet.sh out.png a.png b.png ...
out=$1; shift
n=$#; cols=4
ffmpeg -v error -y $(for f in "$@"; do printf -- "-i %s " "$f"; done) -filter_complex "$(i=0; for f in "$@"; do printf "[%d]scale=360:640[s%d];" $i $i; i=$((i+1)); done; i=0; for f in "$@"; do printf "[s%d]" $i; i=$((i+1)); done; printf "xstack=inputs=%d:layout=" $n; i=0; for f in "$@"; do c=$((i % cols)); r=$((i / cols)); [ $i -gt 0 ] && printf "|"; printf "%d_%d" $((c*360)) $((r*640)); i=$((i+1)); done; printf ":fill=black")" "$out"
