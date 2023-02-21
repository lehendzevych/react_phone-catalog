export class Slider {
  constructor(
    public length: number,
    public gap: number,
    public containerWidth: number,
    public itemsOnPage: number,
    public isInfynity?: boolean,
  ) {}

  public index = 0;

  get scrollTo() {
    return this.index * (this.itemWidth + this.gap);
  }

  get itemWidth() {
    return this.itemsOnPage === 1
      ? this.containerWidth
      : (this.containerWidth
        - (this.gap * (this.itemsOnPage - 1))) / this.itemsOnPage;
  }

  private copySlider() {
    const newSlider = {
      ...this,
    };

    Object.setPrototypeOf(newSlider, this);

    return newSlider;
  }

  public prevSlide() {
    this.index -= 1;

    return this.copySlider();
  }

  public setIndex(i: number) {
    this.index = i;

    return this.copySlider();
  }

  public nextSlide() {
    if (this.isInfynity) {
      if (this.index !== this.length - 1) {
        this.index += 1;
      } else {
        this.index = 0;
      }
    } else {
      this.index += 1;
    }

    return this.copySlider();
  }
}
