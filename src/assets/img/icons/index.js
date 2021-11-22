const fs = require("fs");
const pify = require("pify");
const Svgo = require("svgo");

const svgo = new Svgo({
  plugins: [
    {
      convertColors: {
        currentColor: true
      }
    },
    {
      convertShapeToPath: {
        convertArcs: true
      }
    },
    {
      removeAttrs: { attrs: "(class|id)" }
    },
    {
      removeStyleElement: true
    }
  ]
});

const files = fs.readdirSync(__dirname).filter(f => f.endsWith(".svg"));

const optimise = async files =>
  Promise.all(
    files.map(async file => {
      const data = await pify(fs.readFile)(`${__dirname}/${file}`, "utf8");

      const result = await svgo.optimize(data);

      return {
        name: file,
        value: result.data
      };
    })
  );

const iconsFactory = async () => {
  const optimisedFiles = await optimise(files);

  return optimisedFiles.reduce(
    (acc, { name, value }) =>
      Object.assign(acc, {
        [name.slice(0, -4).replace(/^(BT_Icons_)/, "")]: {
          description: name,
          value
        }
      }),
    {}
  );
};

module.exports = { iconsFactory };
