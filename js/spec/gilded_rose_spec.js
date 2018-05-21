describe("Gilded Rose", function() {

  describe("update_quality()", () => {

    describe("common behaviors", () => {
      it("should decrease quality");
      it("should decrease sell-in");
      it("should decrease quality by 2 if past sell-by");
      it("should not decrease quality < 0");
    });

    describe("Brie", () => {
      it("should increase quality");
      it("should not increase quality > 50");
    });

    describe("Backstage", () => {
      it("should increase quality");
      it("should increase quality by 2 when < 10 days left");
      it("should increase quality by 3 when < 5 days left");
      it("should decrease quality to 0 when past sell-by")
      it("should not increase quality > 50");
    });

    describe("Sulfuras", () => {
      it("should not decrease sell-in");
      it("should not decrease quality");
    });

    xdescribe("Conjured items");
  })
});
