import { useState } from "react";
import style from "./style.module.css";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type TTodo = {
  id: number;
  text: string;
  completed: boolean;
};

const SortableTodo = ({ todo }: { todo: TTodo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={todo.id}
    >
      {todo.text}
    </li>
  );
};

export default function Todo() {
  const [todos, setTodos] = useState<TTodo[]>([
    { id: 1, text: "meeting with marwan", completed: false },
    { id: 2, text: "study", completed: false },
  ]);
  const [input, setInput] = useState<string>("");

  const handleBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: TTodo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("onDragEnd", event);
    const{active , over} = event;
    if(over !== null && over.id === active.id){
      return
    }
    setTodos(todos => {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = over !== null ? todos.findIndex((todo) => todo.id === over.id) : -1;
      if(newIndex !== -1){
        return arrayMove(todos , oldIndex , newIndex)
      }
      return todos
    })
  };

  return (
    <div className={style.main_container}>
      <h1>Todo List</h1>
      <ul>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <SortableTodo key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
      <form onSubmit={handleBtn}>
        <input
          className={style.input}
          value={input}
          type="text"
          placeholder="Add todo item"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button className={style.button} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
