module.exports = {
  toDataUri: (mimetype, stream) => {
    let buffers = [];
    let buffer;
    let dataUri;
    return new Promise((resolve, reject) => {
      stream
        .on("data", chunk => {
          buffers.push(chunk);
        })
        .on("end", () => {
          buffer = Buffer.concat(buffers).toString("base64");
          dataUri = `data:${mimetype};base64,${buffer}`;
          resolve(dataUri);
        });
    });
  }
};
