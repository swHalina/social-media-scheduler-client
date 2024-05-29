import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SchedulePostProps {
  onPost: (content: string, scheduleDate: Date | null) => void;
}

const SchedulePost: React.FC<SchedulePostProps> = ({ onPost }) => {
  const [post, setPost] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(new Date());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPost(post, scheduleDate);
    setPost('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={post}
        onChange={handleChange}
        placeholder="Escribe tu publicación..."
        className="border p-2 w-full"
      />
      <div className="mt-4">
        <label className="block mb-2">Selecciona la fecha y hora:</label>
        <DatePicker
          selected={scheduleDate}
          onChange={(date: Date | null) => setScheduleDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Programar Publicación</button>
    </form>
  );
};

export default SchedulePost;