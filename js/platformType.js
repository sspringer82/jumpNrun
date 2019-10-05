class PlatformType {

}

PlatformType.getRandomNormal = () => {
  const randomLabel = PlatformType.normalLabels[Math.floor(Math.random() * PlatformType.normalLabels.length)];
  return PlatformType.normal[randomLabel];
};

PlatformType.normalLabels = ['normal', 'oneflower', 'threeflowers'];

PlatformType.normal = {
  normal: {
    label: 'normal',
    x: 946,
    y: 435
  },
  oneflower: {
    label: 'oneflower',
    x: 1286,
    y: 435
  },
  threeflowers: {
    label: 'threeflowers',
    x: 625,
    y: 435
  }
};

PlatformType.edge = {
  left: {
    label: 'left',
    x: 572,
    y: 76
  },
  right: {
    label: 'right',
    x: 1290,
    y: 76
  }
};