#!/bin/bash
# Generate gallery items for all images
images=(
"gallery-01.jpeg" "gallery-02.jpeg" "gallery-03.jpeg" "gallery-04.jpeg"
"gallery-05.jpeg" "gallery-06.jpeg" "gallery-07.jpeg" "gallery-08.jpeg"
"gallery-09.jpeg" "gallery-10.jpeg" "gallery-11.jpeg" "gallery-12.jpeg"
"gallery-13.jpeg" "gallery-14.jpeg" "gallery-15.jpeg" "gallery-16.jpeg"
"gallery-17.jpeg" "gallery-18.jpeg" "gallery-19.jpeg" "gallery-20.jpeg"
"gallery-21.jpeg" "gallery-22.jpeg" "gallery-23.jpeg" "gallery-24.jpeg"
"gallery-25.jpeg" "gallery-26.jpeg" "gallery-27.jpeg" "gallery-28.jpeg"
"gallery-29.jpeg" "gallery-30.jpeg" "gallery-31.jpeg" "gallery-32.jpeg"
"gallery-33.jpeg" "gallery-34.jpeg" "gallery-35.jpeg" "gallery-36.jpeg"
"gallery-37.jpeg" "gallery-38.jpeg" "gallery-39.jpeg" "gallery-40.jpeg"
"gallery-41.jpeg" "gallery-42.jpeg" "gallery-43.jpeg"
"games.jpeg" "games2.jpeg" "games3.jpeg" "games4.jpeg" "games5.jpeg"
"school1.jpeg" "school2.jpeg" "school3.jpeg" "school4.jpeg" "school5.jpeg"
"2021-10-09.jpg" "2025-05-20.jpg"
"2025-10-30.jpg" "2025-10-30 (1).jpg" "2025-10-30 (2).jpg" "2025-10-30 (3).jpg"
"2025-11-02.jpg" "2025-11-02 (1).jpg"
"2025-11-19.jpg" "2025-11-19 (1).jpg" "2025-11-19 (2).jpg" "2025-11-19 (3).jpg" "2025-11-19 (4).jpg"
"2026-01-17.jpg" "2026-01-17 (1).jpg"
)

count=0
for img in "${images[@]}"; do
  count=$((count + 1))
  hidden=""
  if [ $count -gt 12 ]; then
    hidden=' style="display:none"'
  fi
  echo "            <div class=\"col-lg-3 col-md-4 col-sm-6 gallery-item\"${hidden}>"
  echo "              <div class=\"gallery-grid-item\">"
  echo "                <img src=\"assets/${img}\" alt=\"School Activity\" loading=\"lazy\">"
  echo "                <div class=\"gallery-overlay\">"
  echo "                  <div class=\"gallery-overlay-content\">"
  echo "                    <a href=\"assets/${img}\" class=\"glightbox gallery-overlay-icon\" data-gallery=\"images-gallery\"><i class=\"bi bi-zoom-in\"></i></a>"
  echo "                  </div>"
  echo "                </div>"
  echo "              </div>"
  echo "            </div>"
done
echo ""
echo "Total images: $count" >&2
