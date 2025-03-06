// Mark all tasks as completed when the button is clicked
document.getElementById('markAllButton').addEventListener('click', function() {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(function(task) {
      task.style.textDecoration = 'line-through';
    });
  });
  