<h1>Books Finder</h1>

Find your book : https://celadon-creponne-da2728.netlify.app/

Data requested from Google Books API.
</br>
Test task info: https://github.com/fugr-ru/frontend-javascript-test-2
</br>

<h2>To build container follow next steps</h2>
1. run docker build -t books-finder:dev .
</br>
</br>
2. then run docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3001:3000 \
-e CHOKIDAR_USEPOLLING=true \
books-finder:dev
</br>
</br>
3. app will be started on http://localhost:3001/


<img src="./book-finder.png"  alt="page screen">
