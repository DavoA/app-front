import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const TodoForm = ({ saveTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const onSubmit = async () => {
    // Prepare the todo data
    const todoData = { title, description, due_date: dueDate };

    try {
      // Make a POST request to the backend API to save the todo
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)
      });

      if (!response.ok) {
        throw new Error('Failed to save the todo');
      }

      const result = await response.json();
      console.log('Todo saved successfully:', result);

      // Optionally, you can call a parent component's function to update the todo list
      if (saveTodo) {
        saveTodo(result);
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a title"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter a Description"
          type="textarea"
          value={description}
          onChange={onDescriptionChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="duedate">Due Date</Label>
        <Input
          id="duedate"
          name="duedate"
          type="date"
          value={dueDate}
          onChange={onDueDateChange}
        />
      </FormGroup>
      <Button color="primary" onClick={onSubmit}>Save</Button>
    </Form>
  );
};

export default TodoForm;
