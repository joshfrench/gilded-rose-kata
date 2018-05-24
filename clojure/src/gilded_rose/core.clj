(ns gilded-rose.core)

(defmulti update-item (fn [{:keys [name]}] name))

(defmethod update-item :default [{:keys [sell-in quality] :as item}]
  (assoc item :sell-in (dec sell-in)
              :quality (max (- quality (if (> sell-in 0) 1 2))
                            0)))

(defmethod update-item "Aged Brie" [{:keys [sell-in quality] :as item}]
  (assoc item :sell-in (dec sell-in)
              :quality (min (inc quality)
                            50)))

(defmethod update-item "Backstage passes to a TAFKAL80ETC concert" [{:keys [sell-in quality] :as item}]
  (assoc item :sell-in (dec sell-in)
              :quality (min 50
                            (cond (<= sell-in 0)  0
                                  (<= sell-in 5)  (+ 3 quality)
                                  (<= sell-in 10) (+ 2 quality)
                                  :else           (+ 1 quality)))))

(defmethod update-item "Sulfuras, Hand of Ragnaros" [item] item)

(defn update-quality [items]
  (map update-item items))

(defn item [item-name, sell-in, quality]
  {:name item-name, :sell-in sell-in, :quality quality})

(defn update-current-inventory[]
  (let [inventory 
    [
      (item "+5 Dexterity Vest" 10 20)
      (item "Aged Brie" 2 0)
      (item "Elixir of the Mongoose" 5 7)
      (item "Sulfuras, Hand of Ragnaros" 0 80)
      (item "Backstage passes to a TAFKAL80ETC concert" 15 20)
    ]]
    (update-quality inventory)
    ))
