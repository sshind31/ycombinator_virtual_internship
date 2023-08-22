import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = () => {
    return [
        ['1', 'Stark, White and Abbott', 'Cloned Optimal Architecture', 'in-progress'],
        ['2', 'Wiza LLC', 'Exclusive Bandwidth-Monitored Implementation', 'complete'],
        ['3', 'Nolan LLC', 'Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
        ['4', 'Thompson PLC', 'Streamlined Regional Knowledgeuser', 'in-progress'],
        ['5', 'Walker-Williamson', 'Team-Oriented 6Thgeneration Matrix', 'in-progress'],
        ['6', 'Boehm and Sons', 'Automated Systematic Paradigm', 'backlog'],
        ['7', 'Runolfsson, Hegmann and Block', 'Integrated Transitional Strategy', 'backlog'],
        ['8', 'Schumm-Labadie', 'Operative Heuristic Challenge', 'backlog'],
        ['9', 'Kohler Group', 'Re-Contextualized Multi-Tasking Attitude', 'backlog'],
        ['10', 'Romaguera Inc', 'Managed Foreground Toolset', 'backlog'],
        ['11', 'Reilly-King', 'Future-Proofed Interactive Toolset', 'complete'],
        ['12', 'Emard, Champlin and Runolfsdottir', 'Devolved Needs-Based Capability', 'backlog'],
        ['13', 'Fritsch, Cronin and Wolff', 'Open-Source 3Rdgeneration Website', 'complete'],
        ['14', 'Borer LLC', 'Profit-Focused Incremental Orchestration', 'backlog'],
        ['15', 'Emmerich-Ankunding', 'User-Centric Stable Extranet', 'in-progress'],
        ['16', 'Willms-Abbott', 'Progressive Bandwidth-Monitored Access', 'in-progress'],
        ['17', 'Brekke PLC', 'Intuitive User-Facing Customerloyalty', 'complete'],
        ['18', 'Bins, Toy and Klocko', 'Integrated Assymetric Software', 'backlog'],
        ['19', 'Hodkiewicz-Hayes', 'Programmable Systematic Securedline', 'backlog'],
        ['20', 'Murphy, Lang and Ferry', 'Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
        id: companyDetails[0],
        name: companyDetails[1],
        description: companyDetails[2],
        status: companyDetails[3],
    }));
};

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ["backlog", "in-progress", "complete"];

const getSeperatedArr=(listKey)=>
{
    let itemList=getItems();
    return itemList.filter(function(x){return x.status==listKey});
}

const generateLists = () =>
    lists.reduce(
        (acc, listKey) => ({ ...acc, [listKey]: getSeperatedArr(listKey) }),
        {}
    );

function DraggableBoard() {
    const [elements, setElements] = React.useState(generateLists());

    useEffect(() => {
        setElements(generateLists());
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...elements };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );

        setElements(listCopy);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ListGrid>
                {lists.map((listKey) => (
                    <DraggableElement
                        elements={elements[listKey]}
                        key={listKey}
                        prefix={listKey}
                    />
                ))}
            </ListGrid>
        </DragDropContext>
    );
}

export default DraggableBoard;
