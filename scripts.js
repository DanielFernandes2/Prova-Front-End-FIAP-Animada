document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const progressBar = document.getElementById('progress-bar');
    const marqueesLeft = document.querySelectorAll('.marquee-left');
    const marqueesRight = document.querySelectorAll('.marquee-right');
    const textosPrincipais = document.querySelectorAll('.texto_principal');
    const sobre = document.querySelector('.sobre');
    const animationFrame = document.getElementById('animation-frame');
    const totalFrames = 191;
    const cursosTexto = document.getElementById('cursos-texto');
    const cursosBotoes = document.querySelectorAll('.cursos-botao');

    let isScrolling;

    const startMarquee = () => {
        marqueesLeft.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
        });

        marqueesRight.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
        });
    };

    const stopMarquee = () => {
        marqueesLeft.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
        });

        marqueesRight.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
        });
    };

    const handleScroll = () => {
        if (window.scrollY === 0) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
        startMarquee();

        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            stopMarquee();
        }, 100); // Tempo em milissegundos para detectar o fim do scroll

        // Atualiza a barra de progresso
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / scrollHeight;
        progressBar.style.width = `${scrollFraction * 100}%`;

        // Controle da animação por scroll para a imagem
        const animationSection = document.getElementById('water');
        const animationOffsetTop = animationSection.offsetTop;
        const animationHeight = animationSection.clientHeight;
        const maxScrollTop = animationOffsetTop + animationHeight - window.innerHeight;

        if (scrollTop >= animationOffsetTop - window.innerHeight && scrollTop <= maxScrollTop) {
            const scrollFractionAnimation = (scrollTop - animationOffsetTop + window.innerHeight) / (maxScrollTop - (animationOffsetTop - window.innerHeight));
            const frameIndex = Math.min(
                totalFrames - 1,
                Math.max(0, Math.ceil(scrollFractionAnimation * totalFrames))
            );
            requestAnimationFrame(() => {
                animationFrame.src = `/src/assets/imgs/water/water_${String(frameIndex).padStart(3, '0')}.jpg`;
            });
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Animação dos textos ao carregar a página
    setTimeout(() => {
        textosPrincipais.forEach(texto => {
            texto.classList.add('animate');
        });
        sobre.classList.add('animate');
    }, 500); // Delay para iniciar a animação

    // Repetir os textos nas animações
    const repeatMarqueeText = (marquees) => {
        marquees.forEach(marquee => {
            const text = marquee.querySelector('p').innerText;
            const repeatCount = Math.ceil(window.innerWidth / marquee.offsetWidth) * 10; // *10 para repetir quantas vezes você quer do texto na animação
            marquee.querySelector('p').innerText = text.repeat(repeatCount);
        });
    };

    repeatMarqueeText(marqueesLeft);
    repeatMarqueeText(marqueesRight);

    // Trocar texto da seção de cursos
    const textosCursos = {
        tecnologia: `
            <h2>Tecnologia</h2>
            <ul>
                <li>Big Data Ecosystem <span>REMOTO • LIVE</span></li>
                <li>Creating Dashboards for BI <span>REMOTO • LIVE</span></li>
                <li>Big Data Science - Machine Learning & Data Mining <span>REMOTO • LIVE • MULTIMÍDIA</span></li>
                <li>Storytelling <span>REMOTO • LIVE</span></li>
            </ul>
        `,
        inovacao: `
            <h2>Inovação</h2>
            <ul>
                <li>UX <span>DIGITAL</span></li>
                <li>UX Writing <span>LIVE</span></li>
                <li>Storytelling para Negócios <span>LIVE</span></li>
                <li>Chatbots <span>LIVE</span></li>
            </ul>
        `,
        negocios: `
            <h2>Negócios</h2>
            <ul>
                <li>Agile Culture <span>DIGITAL</span></li>
                <li>DPO Data Protection Officer <span>LIVE</span></li>
                <li>IT Business Partner <span>LIVE</span></li>
                <li>Pericia Forense Computacional <span>LIVE</span></li>
            </ul>
        `
    };

    cursosBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            cursosBotoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
            cursosTexto.innerHTML = textosCursos[botao.getAttribute('data-curso')];
        });
    });
});
