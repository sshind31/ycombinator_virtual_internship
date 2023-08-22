import React from 'react';
import Card from './Card';
import './Swimlane.css';
import { Droppable } from "react-beautiful-dnd";

export default class Swimlane extends React.Component {
  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    })
    return (
        // <Droppable>
        //   {(provided) => (
        //     <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="Swimlane-column">
                <div className="Swimlane-title">{this.props.name}</div>
                <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
                  {cards}
                </div>
              </div>
        //       {provided.placeholder}
        //     </div>
        //   )}
        // </Droppable>
      );
  }

}