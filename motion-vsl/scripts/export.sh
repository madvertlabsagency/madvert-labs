#!/bin/sh
# Muxes the rendered picture with out/mix.wav and writes the deliverables:
#   *-MASTER.mp4            1080x1920 high-quality master (picture stream copied, AAC 320k)
#   *-WhatsApp.mp4          720x1280, 2-pass ~1.1 Mbps, under 16 MB, faststart
#   *-1080p-share.mp4       1080x1920 at ~2.1 Mbps (under 30 MB) for sharing
set -e
cd "$(dirname "$0")/../out"
N=Madvert-White-Label-VSL-9x16
for v in clean captioned; do
  src=master-silent.mp4; [ $v = captioned ] && src=master-captioned-silent.mp4
  ffmpeg -v error -y -i $src -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest -movflags +faststart $N-$v-MASTER.mp4
  for p in 1 2; do
    ffmpeg -v error -y -i $src -i mix.wav -map 0:v -map 1:a -vf scale=720:1280:flags=lanczos -c:v libx264 -preset slow -b:v 1050k \
      -pass $p -passlogfile wa-$v -pix_fmt yuv420p -profile:v high -c:a aac -b:a 128k -ar 44100 -shortest -movflags +faststart \
      $( [ $p = 1 ] && echo "-an -f mp4 /dev/null" || echo "$N-$v-WhatsApp.mp4" )
  done
  for p in 1 2; do
    ffmpeg -v error -y -i $src -i mix.wav -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 2050k -pass $p -passlogfile sh-$v \
      -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart \
      $( [ $p = 1 ] && echo "-an -f mp4 /dev/null" || echo "$N-$v-1080p-share.mp4" )
  done
done
rm -f wa-*.log* sh-*.log*
ls -la $N-*
