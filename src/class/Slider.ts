export class Slider {
  public index = 0;

  public item = this.itemWidth;

  get scrollTo() {
    return this.index * (this.itemWidth + this.gap);
  }

  get itemWidth() {
    return this.itemsOnPage === 1
      ? this.containerWidth
      : (this.containerWidth
        - (this.gap * (this.itemsOnPage - 1))) / this.itemsOnPage;
  }

  constructor(
    public length: number,
    public gap: number,
    public containerWidth: number,
    public itemsOnPage: number,
    public isInfynity: boolean,
  ) {
    this.gap = gap;
    this.containerWidth = containerWidth;
    this.itemsOnPage = itemsOnPage;
    this.isInfynity = isInfynity;
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
      if (this.index !== this.length) {
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
