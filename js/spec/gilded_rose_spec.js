describe("Gilded Rose", function() {

  afterEach(() => items = []);

  describe("update_quality()", () => {
    describe("common behaviors", () => {
      it("should decrease sell_in", () => {
        items.push(new Item("Foo", 10, 20));
        update_quality();
        expect(items[0].sell_in).toEqual(9);
      });

      it("should decrease quality", () => {
        items.push(new Item("Foo", 10, 20));
        update_quality();
        expect(items[0].quality).toEqual(19);
      });

      it("should decrease quality by 2 if past sell-by", () => {
        items.push(new Item("Foo", 0, 10))
        update_quality();
        expect(items[0].quality).toEqual(8);
      });

      it("should not decrease quality < 0", () => {
        items.push(new Item("Foo", 0, 1))
        update_quality();
        expect(items[0].quality).toEqual(0);
      });
    });

    describe("Brie", () => {
      /**
       * Is this a bug? The spec doesn't explicitly say Brie increases by
       * 2, but that's how the current implementation works. Needs
       * confirmation from stakeholder!
       */
      it("should increase quality", () => {
        items.push(new Item("Aged Brie", 0, 10));
        update_quality();
        expect(items[0].quality).toEqual(12);
      });

      it("should not increase quality > 50", () => {
        items.push(new Item("Aged Brie", 0, 49));
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });

    describe("Backstage", () => {
      it("should increase quality", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
        update_quality();
        expect(items[0].quality).toEqual(21);
      });

      it("should increase quality by 2 when < 10 days left", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
        update_quality();
        expect(items[0].quality).toEqual(22);
      });

      it("should increase quality by 3 when < 5 days left", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
        update_quality();
        expect(items[0].quality).toEqual(23);
      });

      it("should decrease quality to 0 when past sell-by", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
        update_quality();
        expect(items[0].quality).toEqual(0);
      });

      it("should not increase quality > 50", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49));
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });

    describe("Sulfuras", () => {
      it("should not decrease sell-in", () => {
        items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
        update_quality();
        expect(items[0].sell_in).toEqual(-1);
      });

      it("should not decrease quality", () => {
        items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
        update_quality();
        expect(items[0].quality).toEqual(80);
      });
    });
  });

  describe('updateCommonItem()', () => {
    it("should decrease sell_in", () => {
      let item = updateCommonItem(new Item("Foo", 10, 20));
      expect(item.sell_in).toEqual(9);
    });

    it("should decrease quality", () => {
      let item = updateCommonItem(new Item("Foo", 10, 20));
      expect(item.quality).toEqual(19);
    });

    it("should decrease quality by 2 if past sell-by", () => {
      let item = updateCommonItem(new Item("Foo", 0, 10))
      expect(item.quality).toEqual(8);
    });

    it("should not decrease quality < 0", () => {
      let item = updateCommonItem(new Item("Foo", 0, 1))
      expect(item.quality).toEqual(0);
    });
  });

  describe('updateBrie()', () => {
    it("should increase quality", () => {
      let item = updateBrie(new Item("Aged Brie", 0, 10));
      expect(item.quality).toEqual(12);
    });

    it("should not increase quality > 50", () => {
      let item = updateBrie(new Item("Aged Brie", 0, 49));
      expect(item.quality).toEqual(50);
    });
  });

  describe('updateBackstage()', () => {
    it("should increase quality", () => {
      let item = updateBackstage(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
      expect(item.quality).toEqual(21);
    });

    it("should increase quality by 2 when < 10 days left", () => {
      let item = updateBackstage(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
      expect(item.quality).toEqual(22);
    });

    it("should increase quality by 3 when < 5 days left", () => {
      let item = updateBackstage(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
      expect(item.quality).toEqual(23);
    });

    it("should decrease quality to 0 when past sell-by", () => {
      let item = updateBackstage(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
      expect(item.quality).toEqual(0);
    });

    it("should not increase quality > 50", () => {
      let item = updateBackstage(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49));
      expect(item.quality).toEqual(50);
    });
  });

  describe('updateSulfuras', () => {
    it("should not decrease sell-in", () => {
      let item = updateSulfuras(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
      expect(item.sell_in).toEqual(-1);
    });

    it("should not decrease quality", () => {
      let item = updateSulfuras(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
      expect(item.quality).toEqual(80);
    });
  });

  describe("updateConjuredItem()", () => {
    it('should decrease quality by 2', () => {
      let item = updateConjured(new Item("Conjured Mana Cake", 3, 6));
      expect(item.quality).toEqual(4);
    });

    it('should decrease quality by 4 after sell-by', () => {
      let item = updateConjured(new Item("Conjured Mana Cake", 0, 10));
      expect(item.quality).toEqual(6);
    });

    it('should not decrease quality < 0', () => {
      let item = updateConjured(new Item("Conjured Mana Cake", 3, 1));
      expect(item.quality).toEqual(0);
    });
  });
});
