import { useState, useEffect, useRef } from 'react';

export const useResizable = (initialWidth = 300, minWidth = 150, maxWidth = 600) => {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const elementRef = useRef(null);

  const startResizing = () => setIsResizing(true);

  useEffect(() => {
    const resize = (e) => {
      if (isResizing && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;
        setWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
      }
    };

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);

      // 👇 ДОБАВЛЯЕМ ЭТУ СТРОКУ: запрещаем выделение на всей странице
      document.body.classList.add('is-resizing');
    }

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);

      // 👇 ДОБАВЛЯЕМ ЭТУ СТРОКУ: убираем класс при остановке
      document.body.classList.remove('is-resizing');
    };
  }, [isResizing, minWidth, maxWidth]);

  return { width, isResizing, startResizing, elementRef };
};

const Sidebar = ({
  initialWidth = 300,
  minWidth = 150,
  maxWidth = 600,
  children,
}) => {
  const { width, isResizing, startResizing, elementRef } = useResizable(
    initialWidth,
    minWidth,
    maxWidth
  );

  return (
    <div className="chats">
      <div ref={elementRef} className="sidebar" style={{ width: `${width}px` }}>
        <div className="resize-handle" onMouseDown={startResizing} />
        {children} { }
      </div>
    </div>
  );
};

export default Sidebar;
