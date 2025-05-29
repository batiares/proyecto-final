function setupConclusionAnimations() {
    const conclusionSection = document.querySelector('.philosophy-conclusion');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(conclusionSection);
}

document.addEventListener('DOMContentLoaded', setupConclusionAnimations);

document.addEventListener('DOMContentLoaded', function() {

    const commentInput = document.getElementById('comment-input');
    const submitButton = document.getElementById('submit-comment');
    const commentsContainer = document.getElementById('comments-container');
    loadComments();
    submitButton.addEventListener('click', addNewComment);
    commentInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNewComment();
        }
    });
    
    function addNewComment() {
        const commentText = commentInput.value.trim();
        
        if (!commentText) {
            alert("¡No puedes enviar un comentario vacío, choom!");
            return;
        }
        
        const newComment = {
            text: commentText,
            date: new Date().toISOString(),
            id: Date.now() 
        };
        
        saveComment(newComment);
        commentInput.value = '';
        loadComments(); 
    }
    
    function saveComment(comment) {
        const comments = getStoredComments();
        comments.unshift(comment); 
        localStorage.setItem('cyberpunk-comments', JSON.stringify(comments));
    }
    
    function loadComments() {
        const comments = getStoredComments();
        renderComments(comments);
    }
    
    function getStoredComments() {
        return JSON.parse(localStorage.getItem('cyberpunk-comments')) || [];
    }
    
    function renderComments(comments) {
        commentsContainer.innerHTML = ''; 
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">No hay comentarios todavía. ¡Sé el primero en romper el hielo!</p>';
            return;
        }
        
        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro');
    const logoSpan = document.querySelectorAll('.logoo-parts');

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 200);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 70);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
            intro.style.display = 'none';
        }, 3000);
    }, 500);
});

function toggleEndingTooltip(card) {
    const tooltip = card.querySelector('.ending-tooltip');
    const overlay = document.querySelector('.tooltip-overlay');
    
    document.querySelectorAll('.ending-tooltip.active').forEach(t => {
        t.classList.remove('active');
    });
    
    if (tooltip.classList.contains('active')) {
        if (overlay) overlay.classList.remove('active');
        return;
    }
    
    tooltip.classList.add('active');
    
    if (overlay) overlay.classList.add('active');
    
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
}

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.edgerunners-intro');
    const logoParts = document.querySelectorAll('.logo-part');
    const introText = document.querySelector('.intro-text');

    setTimeout(() => {
        logoParts.forEach((part, index) => {
            setTimeout(() => {
                part.classList.add('active');
            }, index * 150); 
        });
        setTimeout(() => {
            introText.classList.add('active');
            setTimeout(() => {
                logoParts.forEach((part, index) => {
                    setTimeout(() => {
                        part.classList.remove('active');
                        part.classList.add('fade');
                    }, index * 50);
                });
                setTimeout(() => {
                    intro.style.opacity = '0';
                    intro.style.visibility = 'hidden';
                    intro.style.pointerEvents = 'none';
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 1500);
        }, (logoParts.length * 150) + 500); 
    }, 500); 
});

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.edgerunners-intro');
    const logoParts = document.querySelectorAll('.logo-part');
    const introText = document.querySelector('.intro-text');

    setTimeout(() => {
        logoParts.forEach((part, index) => {
            setTimeout(() => part.classList.add('active'), index * 150);
        });

        setTimeout(() => {
            introText.classList.add('active');
            setTimeout(() => {
                logoParts.forEach((part, index) => {
                    setTimeout(() => {
                        part.classList.remove('active');
                        part.classList.add('fade');
                    }, index * 50);
                });
                setTimeout(() => {
                    intro.style.opacity = '0';
                    intro.style.visibility = 'hidden';
                    intro.style.pointerEvents = 'none';
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 1500);
        }, (logoParts.length * 150) + 500);
    }, 500);

document.querySelectorAll('.edg-character-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.edg-character-modal')) {
            const modal = card.querySelector('.edg-character-modal');
            modal.style.display = 'flex';
            modal.classList.add('active-modal');
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('.edg-character-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('active-modal');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.edg-character-modal.active-modal').forEach(modal => {
            modal.style.display = 'none';
            modal.classList.remove('active-modal');
            document.body.style.overflow = 'auto';
        });
    }
});
});

// Control del spoiler de Lucy
document.addEventListener('DOMContentLoaded', function() {
    const thumbnail = document.getElementById('spoilerThumbnail');
    const video = document.getElementById('spoilerVideo');
    const backgroundMusic = document.querySelector('audio');
    
    thumbnail.addEventListener('click', function(e) {
        e.stopPropagation();
        thumbnail.style.display = 'none';
        video.style.display = 'block';
        video.play();
        
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.pause();
        }
    });

    document.getElementById('spoilerContent').addEventListener('click', function(e) {
        if (e.target === this) {
            video.pause();
            video.style.display = 'none';
            thumbnail.style.display = 'block';
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play();
            }
        }
    });
    video.addEventListener('ended', function() {
        this.style.display = 'none';
        thumbnail.style.display = 'block';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.querySelector('audio');
    const spoilerTrigger = document.getElementById('spoilerTrigger');
    const spoilerContent = document.getElementById('spoilerContent');
    const spoilerThumbnail = document.getElementById('spoilerThumbnail');
    const spoilerVideo = document.getElementById('spoilerVideo');
    let isMusicPlaying = false;

    function playVideo() {
        isMusicPlaying = !backgroundMusic.paused;
        
        if (isMusicPlaying) {
            backgroundMusic.pause();
        }
        
        spoilerContent.style.display = 'block';
        spoilerThumbnail.style.display = 'none';
        spoilerVideo.style.display = 'block';
        spoilerVideo.play().catch(e => console.error("Error al reproducir video:", e));
    }

    function pauseVideo() {
        spoilerVideo.pause();
        spoilerContent.style.display = 'none';
        

        if (isMusicPlaying) {
            backgroundMusic.play().catch(e => console.error("Error al reanudar música:", e));
        }
    }
    spoilerTrigger.addEventListener('click', function() {
        if (spoilerContent.style.display === 'block') {
            pauseVideo();
        } else {
            playVideo();
        }
    });

    spoilerThumbnail.addEventListener('click', playVideo);
    spoilerVideo.addEventListener('ended', pauseVideo);
    spoilerVideo.addEventListener('pause', function() {
        if (isMusicPlaying && spoilerContent.style.display === 'block') {
            backgroundMusic.play().catch(e => console.error("Error al reanudar música:", e));
        }
    });

    if (backgroundMusic) {
        backgroundMusic.muted = true;
        backgroundMusic.play()
            .then(() => {
                backgroundMusic.muted = false;
                isMusicPlaying = true;
            })
            .catch(e => {
                console.log("Autoplay bloqueado, se requerirá interacción del usuario");
                document.body.addEventListener('click', function initMusic() {
                    backgroundMusic.play()
                        .then(() => {
                            isMusicPlaying = true;
                            document.body.removeEventListener('click', initMusic);
                        })
                        .catch(e => console.error("Error al iniciar música:", e));
                }, { once: true });
            });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.nightcity-intro');
    const titleParts = document.querySelectorAll('.nightcity-title-part');
    const introText = document.querySelector('.intro-content p');
    
    titleParts.forEach((part, idx) => {
        setTimeout(() => {
            part.classList.add('nc-glow');
            if(idx === 0) new Audio('./sounds/glitch.mp3').play().catch(e => {});
        }, idx * 100);
    });
    setTimeout(() => {
        introText.style.animation = 'textFadeIn 1.5s forwards';
    }, 1200);
    setTimeout(() => {
        titleParts.forEach((part, idx) => {
            setTimeout(() => {
                part.classList.remove('nc-glow');
                part.classList.add('nc-smoke');
            }, idx * 40);
        });
    }, 3000);

    setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.top = '-100vh';
        intro.style.transform = 'rotateX(60deg)';
        setTimeout(() => {
            intro.style.display = 'none';
            document.querySelector('.night-city-section').style.animation = 'contentFadeIn 2s forwards';
        }, 1000);
    }, 4500);
});

document.addEventListener('DOMContentLoaded', function() {
    const config = {
        useAPI: false, 
        apiURL: 'https://tu-api.com/comments',
        storageKey: 'philosophy-comments'
    };

    const commentInput = document.getElementById('comment-input');
    const submitButton = document.getElementById('submit-comment');
    const commentsContainer = document.getElementById('comments-container');
    const loadingIndicator = document.getElementById('loading-comments') || createLoadingIndicator();

    if (!commentInput || !submitButton || !commentsContainer) {
        console.error('Elementos esenciales no encontrados');
        return;
    }

    loadComments();

    submitButton.addEventListener('click', handleSubmit);
    commentInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });

    function createLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'loading-comments';
        loader.style.display = 'none';
        loader.textContent = 'Cargando comentarios...';
        commentsContainer.parentNode.insertBefore(loader, commentsContainer);
        return loader;
    }

    async function handleSubmit() {
        const commentText = commentInput.value.trim();
        
        if (!commentText) {
            showAlert('Por favor escribe un comentario');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Publicando...';

        try {
            const newComment = {
                text: commentText,
                date: new Date().toISOString(),
                user: 'Anónimo' 
            };

            if (config.useAPI) {
                await saveCommentAPI(newComment);
            } else {
                saveCommentLocal(newComment);
            }

            commentInput.value = '';
            await loadComments();

            submitButton.textContent = '¡Publicado!';
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error al publicar tu comentario');
            submitButton.textContent = 'PUBLICAR';
        } finally {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'PUBLICAR';
            }, 2000);
        }
    }

    // ========== Funciones para localStorage ==========
    function saveCommentLocal(comment) {
        try {
            const comments = getCommentsLocal();
            comment.id = Date.now(); // Añadir ID único
            comments.unshift(comment);
            localStorage.setItem(config.storageKey, JSON.stringify(comments));
        } catch (error) {
            console.error('Error al guardar localmente:', error);
            throw error;
        }
    }

    function getCommentsLocal() {
        try {
            return JSON.parse(localStorage.getItem(config.storageKey)) || [];
        } catch (error) {
            console.error('Error al leer comentarios locales:', error);
            return [];
        }
    }

    // ========== Funciones para API ==========
    async function saveCommentAPI(comment) {
        try {
            const response = await fetch(config.apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al guardar en API:', error);
            throw error;
        }
    }

    async function getCommentsAPI() {
        try {
            loadingIndicator.style.display = 'block';
            commentsContainer.style.display = 'none';

            const response = await fetch(config.apiURL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al cargar desde API:', error);
            throw error;
        } finally {
            loadingIndicator.style.display = 'none';
            commentsContainer.style.display = 'block';
        }
    }

    // ========== Funciones compartidas ==========
    async function loadComments() {
        try {
            let comments = [];
            
            if (config.useAPI) {
                comments = await getCommentsAPI();
            } else {
                comments = getCommentsLocal();
            }

            renderComments(comments);
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
            commentsContainer.innerHTML = `
                <p class="error-comments">
                    Error al cargar comentarios. Recarga la página para intentarlo de nuevo.
                </p>
            `;
        }
    }

    function renderComments(comments) {
        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            commentsContainer.innerHTML = `
                <p class="no-comments">
                    No hay comentarios aún. ¡Sé el primero en compartir tus pensamientos!
                </p>
            `;
            return;
        }

        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });
    }

    function createCommentElement(comment) {
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-card';
        commentDiv.dataset.id = comment.id;
        commentDiv.innerHTML = `
            <p class="comment-text">${escapeHtml(comment.text)}</p>
            <div class="comment-meta">
                <span class="comment-user">${comment.user || 'Anónimo'}</span>
                <span class="comment-date">${formattedDate}</span>
                ${config.useAPI ? '' : `<button class="delete-comment" data-id="${comment.id}">Eliminar</button>`}
            </div>
        `;

        if (!config.useAPI) {
            commentDiv.querySelector('.delete-comment').addEventListener('click', async function() {
                if (confirm('¿Eliminar este comentario?')) {
                    await deleteComment(comment.id);
                }
            });
        }

        return commentDiv;
    }

    async function deleteComment(commentId) {
        try {
            if (config.useAPI) {
                await fetch(`${config.apiURL}/${commentId}`, { method: 'DELETE' });
            } else {
                const comments = getCommentsLocal().filter(c => c.id !== commentId);
                localStorage.setItem(config.storageKey, JSON.stringify(comments));
            }
            await loadComments();
        } catch (error) {
            console.error('Error al eliminar:', error);
            showAlert('Error al eliminar el comentario');
        }
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'comment-alert';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
});