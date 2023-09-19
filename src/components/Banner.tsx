"use client";
import Icons from "@/components/Icons";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "./ui/Button";

interface Item {
  id: string;
  name: string;
  image: string;
}

const Banner = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Item 1", image: "/duck1.jpg" },
    { id: "2", name: "Item 2", image: "/duck2.jpg" },
    { id: "3", name: "Item 3", image: "/people.jpeg" },
    { id: "4", name: "Item 4", image: "/bg.jpg" },
    { id: "5", name: "Item 5", image: "/bird1.jpg" },
    { id: "6", name: "Item 6", image: "/bird1.jpg" },
  ]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [filterItem, setFilterItem] = useState<Item[]>(items);
  const reorderedItems = [...items];
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", String(index));
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedItemIndex(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("text"));

    const [draggedItem] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(targetIndex, 0, draggedItem);
    setItems(reorderedItems);
    setIsSaveEnabled(true);
    setFilterItem(reorderedItems);
  };

  const handleSave = () => {
    // Save the items in their new ordering
    setIsSaveEnabled(false);
  };

  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        {/* preview carousel here */}
        <div className="text-white pt-6 px-60">
          <Carousel>
            {filterItem.slice(0, 4).map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.image} alt={`image-${item.id}`} />
                  <p className="legend">{item.name}</p>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="container w-full mx-auto mt-12">
          <div className="flex justify-between pb-2">
            <p>Banner</p>
            <div className="flex items-center align-middle gap-2">
              <Button color="primary" onClick={handleSave}>
                <Icons.Plus />
                Add
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isSaveEnabled}
                className={`bg-teal-400 ${
                  !isSaveEnabled ? "bg-gray-300 hover:bg-gray-300" : ""
                }`}
              >
                <p>Save</p>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {index < 4 && (
                  <div
                    className={`flex rounded-md align-middle shadow-md p-4 gap-6 ${
                      index === 0 ? "" : "mt-2"
                    } ${
                      draggedItemIndex === index
                        ? "bg-indigo-800 shadow-lg"
                        : "bg-white dark:bg-black dark:text-white"
                    }`}
                  >
                    <div className="flex items-center text-center p-6">
                      {" "}
                      <p>{index + 1}</p>
                    </div>

                    <img
                      src={item.image}
                      alt={`image-${item.id}`}
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.name}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="dark:text-white">
            {" "}
            <p>Drag to order 1-10 to show preview</p>
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {index > 3 && (
                  <div
                    className={`flex rounded-md align-middle shadow-md p-4 gap-6 ${
                      index === 0 ? "" : "mt-2"
                    } ${
                      draggedItemIndex === index
                        ? "bg-indigo-800 shadow-lg"
                        : "bg-white dark:bg-black dark:text-white"
                    }`}
                  >
                    <div className="flex items-center text-center p-6">
                      {" "}
                      <p>{index + 1}</p>
                    </div>

                    <img
                      src={item.image}
                      alt={`image-${item.id}`}
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.name}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
