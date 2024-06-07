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
import NavigationItem from "./NavigationItem";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";

interface NavigationListProps {
  isHidden: boolean;
}

const NavigationList: React.FC<NavigationListProps> = ({ isHidden }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [horizontalScrollBarVisible, setHorizontalScrollBarVisible] =
    useState(false);

  const blockRef = useRef(null);

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

    if (block) {
      block.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      handleScroll();
      handleResize();
    }

    return () => {
      if (block) {
        block.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  // console.log(horizontalScrollBarVisible, isDragging);

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
                        isHidden &&
                          !nav.isPinned &&
                          "opacity-0 pointer-events-none",
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
