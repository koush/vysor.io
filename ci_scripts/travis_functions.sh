#!/bin/sh

travis_transfer() {
  if [ $# -eq 0 ]; then
    echo -e "No arguments specified. Usage:\necho transfer /tmp/test.md\ncat /tmp/test.md | transfer test.md"
    return 1
  fi
  tmpfile=$(mktemp -t transferXXX)
  if tty -s; then
    basefile=$(basename "$1" | sed -e 's/[^a-zA-Z0-9._-]/-/g')
    curl --progress-bar --upload-file "$1" "https://transfer.sh/$basefile" >>$tmpfile
  else curl --progress-bar --upload-file "-" "https://transfer.sh/$1" >>$tmpfile; fi
  cat $tmpfile
  rm -f $tmpfile
}

travis_install() {
  wget -c https://github.com/probonopd/uploadtool/raw/master/upload.sh
  chmod +x upload.sh

  git clone https://github.com/koush/electron-chrome

  (
    cd electron-chrome
    npm install
  )
}

travis_script() {
  (
    cd electron-chrome
    npm run package-linux -- --app-dir=../public/app/
    ./node_modules/.bin/electron-builder --project build/ --linux snap AppImage --publish never

    cd ./build/dist/
    # Replace spaces with underscores in filename
    mv Vysor*.AppImage $(echo Vysor*.AppImage | tr ' ' '_')
  )
}

travis_after_success() {
  (
    cd electron-chrome/build/dist
    
    travis_transfer Vysor*.AppImage
    travis_transfer Vysor*.snap
  )
  
  ./upload.sh ./electron-chrome/build/dist/Vysor*.AppImage ./electron-chrome/build/dist/Vysor*.snap
}