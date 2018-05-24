(ns gilded-rose.core)

(defn decr-sell-in [item]
  (update item :sell-in dec))

(defn check-bounds [{:keys [quality] :as item}]
  (assoc item :quality (-> quality (max 0) (min 50))))

(defmulti update-item (fn [{:keys [name]}] name))

(defmethod update-item :default [{:keys [sell-in quality] :as item}]
  (-> item
      decr-sell-in
      (assoc :quality (- quality (if (> sell-in 0) 1 2)))
      check-bounds))

(defmethod update-item "Aged Brie" [item]
  (-> item
      decr-sell-in
      (update :quality inc)
      check-bounds))

(defmethod update-item "Backstage passes to a TAFKAL80ETC concert" [{:keys [sell-in quality] :as item}]
  (-> item
      decr-sell-in
      (assoc :quality (condp >= sell-in
                             0  0
                             5  (+ 3 quality)
                             10 (+ 2 quality)
                                (+ 1 quality)))
      check-bounds))

(defmethod update-item "Sulfuras, Hand of Ragnaros" [item] item)

(defmethod update-item "Conjured Mana Cake" [{:keys [sell-in quality] :as item}]
  (-> item
      decr-sell-in
      (assoc :quality (- quality (if (> sell-in 0) 2 4)))
      check-bounds))

(defn update-quality [items]
  (map update-item items))

(defn item [item-name sell-in quality]
  {:name item-name :sell-in sell-in :quality quality})
