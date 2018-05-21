function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

/**
 * Initially I destructured this:
 *
 * function updateCommonItem({ name, sell_in, quality }) {
 *   return {
 *     name,
 *     sell_in: sell_in - 1,
 *     ...
 *  }
 * }
 *
 * But based on the existing behavior it seems intended to mutate in place, so
 * let's assume that's intentional and leave it for now.
 */
function updateCommonItem(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.sell_in > 0 ? item.quality - 1 : item.quality - 2;
  item.quality = Math.max(0, item.quality);
  return item;
}

/**
 * There's some ambiguity in the original update_quality() method where Brie
 * quality is increased by 2, but that's never made explicit in the spec. I'm
 * keeping the behavior but would want to clarify with the stakeholder.
 */
function updateBrie(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.quality + 2;
  item.quality = Math.min(50, item.quality);
  return item;
}

/**
 * We're starting to see some duplication here -- for instance, the boundary
 * checking (`Math.min(50, item.quality)`). It's tempting to DRY that up, but
 * I have no reason based on the spec as written to believe that this
 * particular logic is changing any time soon. Until then, I think it's
 * premature to spend time on it.
 */
function updateBackstage(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.quality + 1;

  // probably a prettier way to do this; i think having multiple conditionals
  // apply is going to confuse someone later (likely myself)
  if (item.sell_in < 10) {
    item.quality = item.quality + 1;
  }
  if (item.sell_in < 5) {
    item.quality = item.quality + 1;
  }
  if (item.sell_in < 0) {
    item.quality = 0;
  }

  item.quality = Math.min(50, item.quality);
  return item;
}

/**
 * Arguably a useless function, since we could ignore Sulfuras items
 * completely. But for now I like being explicit and adhering to the
 * established pattern.
 */
function updateSulfuras(item) {
  return item;
}

/**
 * I don't love the predicate functions, I think having to keep `isCommon`
 * and `update_quality` in sync as you add new item categories is a likely
 * future gotcha. But that feels like an incremental enhancement that can
 * wait for later.
 */
function isBrie(item) {
  return item.name == "Aged Brie";
}

function isBackstage(item) {
  return item.name == "Backstage passes to a TAFKAL80ETC concert";
}

function isSulfuras(item) {
  return item.name == "Sulfuras, Hand of Ragnaros";
}

function isCommon(item) {
  return !(isBrie(item) || isBackstage(item) || isSulfuras(item));
}

function update_quality() {
  items.filter(isCommon).map(updateCommonItem);
  items.filter(isBrie).map(updateBrie);
  items.filter(isBackstage).map(updateBackstage);
  items.filter(isSulfuras).map(updateSulfuras);
}
