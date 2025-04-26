// textarea-styles.js
// Скрипт для улучшения стилей textarea

document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент <style>
    const style = document.createElement('style');
    style.textContent = `
        /* Улучшенный стиль для текстовых полей ввода условий */
        .condition-json-input,
        textarea.form-control,
        textarea.form-control-sm {
            width: 100% !important;
            min-height: 36px !important;
            border-radius: 6px !important;
            resize: vertical !important;
            overflow: auto !important;
            transition: border-color 0.15s ease-in-out !important; /* Уменьшили время анимации и оставили только для border-color */
            padding: 8px 12px !important;
            line-height: 1.5 !important;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace !important;
            font-size: 13px !important;
            color: #333 !important;
            border: 1px solid #d1d5db !important;
            background-color: #f9fafb !important;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        }

        .condition-json-input:focus,
        textarea.form-control:focus,
        textarea.form-control-sm:focus {
            outline: none !important;
            border-color: #606bdb !important;
            box-shadow: 0 0 0 3px rgba(96, 107, 243, 0.15) !important;
            background-color: #fff !important;
        }

        /* Стиль для темной темы */
        [data-theme="dark"] .condition-json-input,
        [data-theme="dark"] textarea.form-control,
        [data-theme="dark"] textarea.form-control-sm {
            color: #e2e8f0 !important;
            background-color: #2D3748 !important;
            border-color: #4a5568 !important;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2) !important;
        }

        [data-theme="dark"] .condition-json-input:focus,
        [data-theme="dark"] textarea.form-control:focus,
        [data-theme="dark"] textarea.form-control-sm:focus {
            border-color: #606bdb !important;
            box-shadow: 0 0 0 3px rgba(96, 107, 243, 0.25) !important;
            background-color: #3a4a61 !important;
        }

        /* Улучшенный вид при наведении */
        .condition-json-input:hover,
        textarea.form-control:hover,
        textarea.form-control-sm:hover {
            border-color: #b1b5be !important;
        }

        [data-theme="dark"] .condition-json-input:hover,
        [data-theme="dark"] textarea.form-control:hover,
        [data-theme="dark"] textarea.form-control-sm:hover {
            border-color: #606b94 !important;
        }
    `;
    
    // Добавляем стили в head
    document.head.appendChild(style);
    
    // Функция для инициализации текстовых полей
    function initializeTextareas() {
        document.querySelectorAll('textarea.condition-json-input, textarea.form-control, .condition-textarea').forEach(textarea => {
            // Убеждаемся, что inline стили не блокируют наши CSS правила
            if (textarea.style.resize === 'none') {
                textarea.style.removeProperty('resize');
            }
            
            // Устанавливаем моментальное изменение размера без анимации
            textarea.style.transition = 'none';
            
            // Отключаем плавное изменение высоты
            textarea.addEventListener('input', function() {
                // Сохраняем текущую позицию прокрутки
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Мгновенно меняем высоту (без анимации)
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
                
                // Восстанавливаем позицию прокрутки
                window.scrollTo(0, scrollTop);
            });
            
            // Инициализируем начальную высоту без анимации
            if (textarea.value) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        });
    }
    
    // Инициализируем существующие textarea
    initializeTextareas();
    
    // Следим за появлением новых textarea
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.querySelectorAll) {
                        const textareas = node.querySelectorAll('textarea.condition-json-input, textarea.form-control, .condition-textarea');
                        if (textareas.length > 0) {
                            textareas.forEach(textarea => {
                                // Отключаем анимации для новых textarea
                                if (textarea.style.resize === 'none') {
                                    textarea.style.removeProperty('resize');
                                }
                                textarea.style.transition = 'none';
                            });
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}); 