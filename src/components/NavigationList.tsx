import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "src/lib/utils";
import { IHidden } from "src/lib/types";
import NavigationItem from "./NavigationItem";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";

const NavigationList: React.FC<IHidden> = ({ isHidden }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [horizontalScrollBarVisible, setHorizontalScrollBarVisible] =
    useState(false);

  const blockRef = useRef<HTMLDivElement | null>(null);

  const { navigationData, updateNavigationOrder } = useNavbarNavigation();

  const location = useLocation();

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const sourceTab = navigationData[result.source.index];
    const destinationTab = navigationData[result.destination.index];

    if (sourceTab.isPinned !== destinationTab.isPinned) {
      alert(
        "Fixed tabs cannot be moved to the place of unfastened tabs and vice versa."
      );
      return;
    }

    setIsDragging(false);
    updateNavigationOrder(result.source.index, result.destination.index);
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const block = blockRef.current;

    if (block) {
      const handleScroll = () => {
        const isHorizontalScrollBarVisible =
          block.scrollWidth > block.clientWidth;
        setHorizontalScrollBarVisible(isHorizontalScrollBarVisible);
      };

      const handleResize = () => {
        const isHorizontalScrollBarVisible =
          block.scrollWidth > block.clientWidth;
        setHorizontalScrollBarVisible(isHorizontalScrollBarVisible);
      };

      block.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      handleScroll();
      handleResize();

      return () => {
        block.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <nav className="h-[42px] grow overflow-y-hidden" ref={blockRef}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided: DroppableProvided) => (
            <ul
              className="flex items-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {navigationData.map((nav, index) => (
                <Draggable
                  key={nav.id}
                  draggableId={`item-${nav.id}`}
                  index={index}
                >
                  {(provided) => (
                    <li
                      key={nav.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "text-gray-700 cursor-pointer border-t-[2.5px] border-t-transparent bg-gray-100 hover:bg-gray-100",
                        isHidden && !nav.isPinned && "sticky-hidden",
                        location.pathname === nav.href &&
                          "border-t-blue-500 bg-gray-100"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <NavigationItem
                        nav={nav}
                        horizontalScrollBarVisible={horizontalScrollBarVisible}
                        isDragging={isDragging}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </nav>
  );
};

export default NavigationList;
