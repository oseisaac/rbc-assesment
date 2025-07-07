

(function () {
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }
    const segment = getQueryParam('segment');

    const AB_KEY = 'rbc-ab-group';
    let abGroup = localStorage.getItem(AB_KEY);
    if (!abGroup) {
        abGroup = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem(AB_KEY, abGroup);
    }

    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTA = document.getElementById('hero-cta');

    const segmentMessages = {
        student: {
            title: 'Open an RBC Student Chequing Account',
            subtitle: 'and Get the New iPad for School',
            cta: 'See Student Offer'
        },
        newcomer: {
            title: 'Open an RBC Newcomer Account',
            subtitle: 'and Get the New iPad to Start Your Journey',
            cta: 'See Newcomer Offer'
        }
    };

    if (abGroup === 'B' && segment && segmentMessages[segment]) {
        heroTitle.innerHTML = segmentMessages[segment].title;
        heroSubtitle.textContent = segmentMessages[segment].subtitle;
        heroCTA.textContent = segmentMessages[segment].cta;
    } else {
        heroTitle.innerHTML = 'Open an Eligible RBC<br>Chequing Account';
        heroSubtitle.textContent = 'and Get the New iPad';
        heroCTA.textContent = 'View Offer Details';
    }
})(); 