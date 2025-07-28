# React Pixi tilemap example

A simple example on how to load a [Tiled](https://www.mapeditor.org/) map into Pixi.js, using pixi-react.

- Loads tiled map (only .json or .tjs)
- Will load embedded tilesets or external
- Will decode base64 encoded maps and also extract gzip compressed
- Supports animated tiles. Create the [animation](https://doc.mapeditor.org/en/stable/manual/editing-tilesets/#tile-animation-editor) in Tiled. Note that for animations to work the frames need to be adjacent.
- Works only with orthogonal maps for now
- Supports (horizontal) parallax on image layers
- Uses [zustand](https://github.com/pmndrs/zustand) to store global vars (map data and camera position)
- Full typescript support

## Credits

Assets were taken from [Luis Zuno aka Ansimuz](https://ansimuz.itch.io).

All assets included in this package are licensed under the [Creative Commons Zero (CC0)](https://creativecommons.org/public-domain/cc0/)
license, which means you can use them freely in any project, whether personal or
commercial, without the need for attribution. There are no restrictions on use,
modification, or redistribution of these assets.