import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = ['new', 'in progress', 'done'];
const initialTasks = [
    { id: '1', content: 'Task 1', status: 'new' },
    { id: '2', content: 'Task 2', status: 'new' },
    { id: '3', content: 'Task 3', status: 'in progress' },
    { id: '4', content: 'Task 4', status: 'done' },
    // وظیفه‌های خودتان را اضافه کنید...
];

const App = () => {
    /* eslint-disable */
    const [items, setItems] = useState(initialItems);
    const [tasks, setTasks] = useState(initialTasks);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            // جابجایی taskها داخل یک board
            const newTasks = Array.from(tasks);
            const [reorderedTask] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, reorderedTask);
            setTasks(newTasks);
        } else {
            // جابجایی taskها بین boardها
            const taskToMove = tasks.find((task) => task.id === result.draggableId);
            const newTasks = tasks.filter((task) => task.id !== result.draggableId);

            taskToMove.status = items[destination.droppableId];
            newTasks.splice(destination.index, 0, taskToMove);

            setTasks(newTasks);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                    padding: '16px',
                }}
            >
                {items.map((item, index) => (
                    <Droppable key={item} droppableId={String(index)}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ border: '1px solid gray', padding: '8px' }}
                            >
                                <h2>{item}</h2>
                                {tasks
                                    .filter((task) => task.status === item)
                                    .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        border: '1px dashed gray',
                                                        backgroundColor: 'white',
                                                        padding: '0.5rem 1rem',
                                                        margin: '0.5rem',
                                                        cursor: 'grab',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default App;
