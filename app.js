/**
 * NamiraHub - Drama Streaming Application
 * Main Application Logic
 */

// =============================================
// Configuration & State
// =============================================
const API_BASE = 'https://dramahubv1.vercel.app';

// =============================================
// Demo/Mock Data for Localhost Preview
// =============================================
const DEMO_MODE = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const DEMO_DATA = {
    home: [
        { series_id: 'demo-1', thumbnail: 'https://picsum.photos/seed/drama1/400/600', title: 'Kisah Cinta di Ibukota', type: 'recommended', desc: 'Randy melintasi waktu ke Zaman Kerajaan sebagai pelajar yang gagal. Dengan sistem baru, ia mendapatkan 3 orang istri untuk membantunya melewati rintangan.' },
        { series_id: 'demo-2', thumbnail: 'https://picsum.photos/seed/drama2/400/600', title: 'Petualangan Sang Naga', type: 'recommended', desc: 'Seorang anak yatim menemukan kekuatan tersembunyi dalam dirinya yang dapat mengubah nasib seluruh kerajaan.' },
        { series_id: 'demo-3', thumbnail: 'https://picsum.photos/seed/drama3/400/600', title: 'Rahasia Keluarga Besar', type: 'recommended', desc: 'Keluarga konglomerat menyimpan rahasia gelap yang terungkap ketika pewaris sah muncul kembali.' },
        { series_id: 'demo-4', thumbnail: 'https://picsum.photos/seed/drama4/400/600', title: 'Cinta Terlarang', type: 'recommended', desc: 'Kisah cinta antara dua insan dari latar belakang yang berbeda yang harus menghadapi berbagai rintangan.' },
        { series_id: 'demo-5', thumbnail: 'https://picsum.photos/seed/drama5/400/600', title: 'Misteri Malam Jumat', type: 'recommended', desc: 'Detektif muda mengungkap kasus-kasus misterius yang terjadi setiap malam Jumat di kota kecil.' },
        { series_id: 'demo-6', thumbnail: 'https://picsum.photos/seed/drama6/400/600', title: 'Sang Pewaris Tahta', type: 'recommended', desc: 'Pertarungan sengit memperebutkan tahta kerajaan antara tiga pangeran dengan ambisi berbeda.' },
        { series_id: 'demo-7', thumbnail: 'https://picsum.photos/seed/drama7/400/600', title: 'Dendam Masa Lalu', type: 'recommended', desc: 'Seorang wanita kembali untuk membalas dendam kepada mereka yang menghancurkan keluarganya.' },
        { series_id: 'demo-8', thumbnail: 'https://picsum.photos/seed/drama8/400/600', title: 'Amor dan Amarah', type: 'recommended', desc: 'Cinta dan kebencian bercampur dalam hubungan rumit antara dua keluarga yang bermusuhan.' },
        { series_id: 'demo-9', thumbnail: 'https://picsum.photos/seed/drama9/400/600', title: 'Kebangkitan Sang Legend', type: 'discovery', desc: 'Legenda yang dianggap mati bangkit kembali untuk menyelamatkan dunia dari kehancuran.' },
        { series_id: 'demo-10', thumbnail: 'https://picsum.photos/seed/drama10/400/600', title: 'Dunia Paralel', type: 'discovery', desc: 'Seorang programmer menemukan portal ke dunia paralel di mana kehidupan berjalan berbeda.' },
        { series_id: 'demo-11', thumbnail: 'https://picsum.photos/seed/drama11/400/600', title: 'Waktu Yang Hilang', type: 'discovery', desc: 'Time traveler berusaha mengubah masa lalu untuk menyelamatkan orang yang dicintainya.' },
        { series_id: 'demo-12', thumbnail: 'https://picsum.photos/seed/drama12/400/600', title: 'Takdir Dua Hati', type: 'discovery', desc: 'Dua orang yang ditakdirkan bersama harus melewati berbagai cobaan sebelum bisa bersatu.' },
        { series_id: 'demo-13', thumbnail: 'https://picsum.photos/seed/drama13/400/600', title: 'Keajaiban Musim Semi', type: 'discovery', desc: 'Kisah magis tentang keajaiban yang terjadi setiap musim semi di desa terpencil.' },
        { series_id: 'demo-14', thumbnail: 'https://picsum.photos/seed/drama14/400/600', title: 'Jejak Langkah Ayah', type: 'discovery', desc: 'Seorang anak menelusuri jejak ayahnya yang menghilang misterius 20 tahun lalu.' },
        { series_id: 'demo-15', thumbnail: 'https://picsum.photos/seed/drama15/400/600', title: 'Perjuangan Sang Ibu', type: 'discovery', desc: 'Kisah inspiratif seorang ibu tunggal yang berjuang membesarkan anak-anaknya.' },
        { series_id: 'demo-16', thumbnail: 'https://picsum.photos/seed/drama16/400/600', title: 'Rindu Kampung Halaman', type: 'discovery', desc: 'Seorang sukses kota besar kembali ke kampung halaman dan menemukan arti hidup yang sesungguhnya.' },
    ],
    seriesInfo: {
        title: 'Demo Drama Series',
        description: 'Ini adalah mode demo untuk preview tampilan website. Data ini ditampilkan karena API tidak dapat diakses dari localhost. Setelah di-deploy ke Vercel, data asli dari API akan muncul dengan episode yang dapat diputar.',
        episodes: Array.from({ length: 80 }, (_, i) => ({ index: i + 1, video_id: `demo-video-${i + 1}` }))
    },
    stream: {
        '240p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '540p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '1440p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        '2160p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
};

// Quality priority order (highest to lowest)
const QUALITY_ORDER = ['2160p', '1440p', '1080p', '720p', '540p', '480p', '360p', '240p'];

const state = {
    // Data
    dramas: [],
    featuredDramas: [],
    currentFeaturedIndex: 0,
    currentOffset: 0,
    isLoading: false,
    hasMore: true,

    // Player
    currentSeries: null,
    currentEpisodeIndex: 0,
    episodes: [],
    streamUrls: null,
    currentQuality: 'auto',

    // Settings
    autoNext: true,

    // UI
    searchTimeout: null,
    controlsTimeout: null,
    countdownInterval: null,
    featuredInterval: null,
    countdown: 5,
};

// =============================================
// DOM Elements
// =============================================
const elements = {
    // Loading
    loadingScreen: document.getElementById('loading-screen'),

    // Header
    header: document.getElementById('header'),
    searchToggle: document.getElementById('search-toggle'),
    searchBox: document.getElementById('search-box'),
    searchInput: document.getElementById('search-input'),
    searchClose: document.getElementById('search-close'),
    searchResults: document.getElementById('search-results'),
    logoLink: document.getElementById('logo-link'),

    // Featured Hero
    featuredBackdrop: document.getElementById('featured-backdrop'),
    featuredTitle: document.getElementById('featured-title'),
    featuredDesc: document.getElementById('featured-desc'),
    featuredPlay: document.getElementById('featured-play'),
    featuredInfo: document.getElementById('featured-info'),
    featuredDots: document.getElementById('featured-dots'),
    featuredPrev: document.getElementById('featured-prev'),
    featuredNext: document.getElementById('featured-next'),

    // Drama Grid
    recommendedGrid: document.getElementById('recommended-grid'),
    discoveryGrid: document.getElementById('discovery-grid'),
    loadMoreBtn: document.getElementById('load-more-btn'),

    // Player
    playerOverlay: document.getElementById('player-overlay'),
    backBtn: document.getElementById('back-btn'),
    playerTitle: document.getElementById('player-title'),
    playerEpisode: document.getElementById('player-episode'),
    autoNextToggle: document.getElementById('auto-next-toggle'),

    // Video
    videoPlayer: document.getElementById('video-player'),
    videoControls: document.getElementById('video-controls'),
    videoLoading: document.getElementById('video-loading'),
    progressBar: document.getElementById('progress-bar'),
    progressFilled: document.getElementById('progress-filled'),
    progressBuffered: document.getElementById('progress-buffered'),
    progressThumb: document.getElementById('progress-thumb'),
    currentTime: document.getElementById('current-time'),
    duration: document.getElementById('duration'),

    // Controls
    playBtn: document.getElementById('play-btn'),
    prevEpisodeBtn: document.getElementById('prev-episode-btn'),
    nextEpisodeBtn: document.getElementById('next-episode-btn'),
    muteBtn: document.getElementById('mute-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    qualityBtn: document.getElementById('quality-btn'),
    qualityMenu: document.getElementById('quality-menu'),
    currentQuality: document.getElementById('current-quality'),
    pipBtn: document.getElementById('pip-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),

    // Next Episode Overlay
    nextEpisodeOverlay: document.getElementById('next-episode-overlay'),
    countdownEl: document.getElementById('countdown'),
    cancelNextBtn: document.getElementById('cancel-next'),
    playNextBtn: document.getElementById('play-next'),

    // Episode List
    episodeList: document.getElementById('episode-list'),
    episodeCount: document.getElementById('episode-count'),
    descriptionText: document.getElementById('description-text'),

    // Toast
    toastContainer: document.getElementById('toast-container'),
};

// =============================================
// API Functions
// =============================================
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        if (!DEMO_MODE) {
            showToast('Gagal memuat data. Silakan coba lagi.', 'error');
        }
        return null;
    }
}

async function fetchHome(offset = 0) {
    const data = await fetchAPI(`/api/home?offset=${offset}`);
    if (!data?.data && DEMO_MODE) {
        console.log('📺 NamiraHub Demo Mode aktif');
        showToast('Mode Demo - Preview tampilan', 'info');
        return DEMO_DATA.home;
    }
    return data?.data || [];
}

async function fetchSearch(query) {
    const data = await fetchAPI(`/api/search?q=${encodeURIComponent(query)}`);
    if (!data?.data && DEMO_MODE) {
        const filtered = DEMO_DATA.home.filter(d =>
            d.title.toLowerCase().includes(query.toLowerCase())
        );
        return filtered;
    }
    return data?.data || [];
}

async function fetchSeriesInfo(seriesId) {
    const data = await fetchAPI(`/api/info?series_id=${seriesId}`);
    if (!data?.data && DEMO_MODE) {
        const drama = DEMO_DATA.home.find(d => d.series_id === seriesId);
        return {
            ...DEMO_DATA.seriesInfo,
            title: drama?.title || 'Demo Drama Series',
            description: drama?.desc || DEMO_DATA.seriesInfo.description
        };
    }
    return data?.data || null;
}

async function fetchStream(videoId) {
    const data = await fetchAPI(`/api/stream?video_id=${videoId}`);
    if (!data?.data && DEMO_MODE) {
        return DEMO_DATA.stream;
    }
    return data?.data || null;
}

// =============================================
// Initialization
// =============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    await loadDramas();

    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
    }, 800);

    setupEventListeners();
    setupVideoPlayer();
    startFeaturedRotation();
}

async function loadDramas() {
    if (state.isLoading) return;

    state.isLoading = true;
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.classList.add('loading');
    }

    const dramas = await fetchHome(state.currentOffset);

    if (dramas.length === 0) {
        state.hasMore = false;
        if (elements.loadMoreBtn) {
            elements.loadMoreBtn.style.display = 'none';
        }
    } else {
        state.dramas = [...state.dramas, ...dramas];

        // Set featured dramas (first 5 recommended)
        if (state.featuredDramas.length === 0) {
            state.featuredDramas = dramas.filter(d => d.type === 'recommended').slice(0, 5);
            updateFeaturedHero();
        }

        renderDramas(dramas);
        state.currentOffset += dramas.length;
    }

    state.isLoading = false;
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.classList.remove('loading');
    }
}

function renderDramas(dramas) {
    const recommended = dramas.filter(d => d.type === 'recommended');
    const discovery = dramas.filter(d => d.type === 'discovery');

    recommended.forEach((drama, index) => {
        elements.recommendedGrid.appendChild(createDramaCard(drama, index < 3));
    });

    discovery.forEach((drama, index) => {
        elements.discoveryGrid.appendChild(createDramaCard(drama, index < 2));
    });
}

function createDramaCard(drama, showBadge = false) {
    const card = document.createElement('div');
    card.className = 'drama-card';
    card.dataset.seriesId = drama.series_id;

    const thumbnail = drama.thumbnail || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect fill="%231a1a24" width="200" height="300"/><text x="50%" y="50%" fill="%23666" font-size="14" text-anchor="middle">No Image</text></svg>';

    card.innerHTML = `
        <div class="drama-card-poster">
            <img class="drama-card-image" src="${thumbnail}" alt="${drama.title}" loading="lazy" onerror="this.style.display='none'">
            <div class="drama-card-overlay"></div>
            <div class="drama-card-play">
                <svg viewBox="0 0 24 24"><path d="M6 4L20 12L6 20V4Z"/></svg>
            </div>
            ${showBadge ? '<span class="drama-card-badge">HOT</span>' : ''}
        </div>
        <h3 class="drama-card-title">${drama.title}</h3>
    `;

    card.addEventListener('click', () => openPlayer(drama));

    return card;
}

// =============================================
// Featured Hero
// =============================================
function updateFeaturedHero() {
    if (state.featuredDramas.length === 0) return;

    const drama = state.featuredDramas[state.currentFeaturedIndex];

    // Update backdrop
    if (drama.thumbnail) {
        elements.featuredBackdrop.style.backgroundImage = `url(${drama.thumbnail})`;
    }

    // Update content
    elements.featuredTitle.textContent = drama.title;
    elements.featuredDesc.textContent = drama.desc || 'Drama series terbaik dengan kualitas HD. Tonton sekarang dan nikmati cerita menarik yang akan membuatmu ketagihan.';

    // Update dots
    renderFeaturedDots();

    // Store current drama for play button
    elements.featuredPlay.onclick = () => openPlayer(drama);
    elements.featuredInfo.onclick = () => openPlayer(drama);
}

function renderFeaturedDots() {
    elements.featuredDots.innerHTML = state.featuredDramas.map((_, index) => `
        <button class="featured-dot ${index === state.currentFeaturedIndex ? 'active' : ''}" data-index="${index}"></button>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.featured-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            state.currentFeaturedIndex = parseInt(dot.dataset.index);
            updateFeaturedHero();
            resetFeaturedRotation();
        });
    });
}

function startFeaturedRotation() {
    state.featuredInterval = setInterval(() => {
        state.currentFeaturedIndex = (state.currentFeaturedIndex + 1) % state.featuredDramas.length;
        updateFeaturedHero();
    }, 8000);
}

function resetFeaturedRotation() {
    clearInterval(state.featuredInterval);
    startFeaturedRotation();
}

// =============================================
// Event Listeners
// =============================================
function setupEventListeners() {
    // Search
    if (elements.searchToggle) {
        elements.searchToggle.addEventListener('click', () => {
            elements.searchBox.classList.add('active');
            elements.searchInput.focus();
        });
    }

    if (elements.searchClose) {
        elements.searchClose.addEventListener('click', closeSearch);
    }

    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearchInput);
    }

    // Close search on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.searchBox?.classList.contains('active')) {
            closeSearch();
        }
    });

    // Logo click - return to home
    if (elements.logoLink) {
        elements.logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            closePlayer();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Load More
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadDramas);
    }

    // Featured navigation
    if (elements.featuredPrev) {
        elements.featuredPrev.addEventListener('click', () => {
            state.currentFeaturedIndex = (state.currentFeaturedIndex - 1 + state.featuredDramas.length) % state.featuredDramas.length;
            updateFeaturedHero();
            resetFeaturedRotation();
        });
    }

    if (elements.featuredNext) {
        elements.featuredNext.addEventListener('click', () => {
            state.currentFeaturedIndex = (state.currentFeaturedIndex + 1) % state.featuredDramas.length;
            updateFeaturedHero();
            resetFeaturedRotation();
        });
    }

    // Carousel buttons
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const container = document.getElementById(targetId);
            if (container) {
                const scrollAmount = btn.classList.contains('prev') ? -400 : 400;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // Category chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            // Filter functionality can be added here
        });
    });

    // Player
    if (elements.backBtn) {
        elements.backBtn.addEventListener('click', closePlayer);
    }

    if (elements.autoNextToggle) {
        elements.autoNextToggle.addEventListener('change', (e) => {
            state.autoNext = e.target.checked;
        });
    }

    // Video controls
    if (elements.playBtn) elements.playBtn.addEventListener('click', togglePlay);
    if (elements.prevEpisodeBtn) elements.prevEpisodeBtn.addEventListener('click', playPreviousEpisode);
    if (elements.nextEpisodeBtn) elements.nextEpisodeBtn.addEventListener('click', playNextEpisode);
    if (elements.muteBtn) elements.muteBtn.addEventListener('click', toggleMute);
    if (elements.volumeSlider) elements.volumeSlider.addEventListener('input', handleVolumeChange);

    // Quality
    if (elements.qualityBtn) {
        elements.qualityBtn.addEventListener('click', toggleQualityMenu);
    }

    document.querySelectorAll('.quality-menu button').forEach(btn => {
        btn.addEventListener('click', () => changeQuality(btn.dataset.quality));
    });

    // Fullscreen & PiP
    if (elements.fullscreenBtn) elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (elements.pipBtn) elements.pipBtn.addEventListener('click', togglePiP);

    // Progress bar
    if (elements.progressBar) {
        elements.progressBar.addEventListener('click', handleProgressClick);
        elements.progressBar.addEventListener('mousemove', handleProgressHover);
    }

    // Next episode overlay
    if (elements.cancelNextBtn) elements.cancelNextBtn.addEventListener('click', cancelAutoNext);
    if (elements.playNextBtn) {
        elements.playNextBtn.addEventListener('click', () => {
            cancelAutoNext();
            playNextEpisode();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Header scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Close quality menu on click outside
    document.addEventListener('click', (e) => {
        if (elements.qualityBtn && elements.qualityMenu) {
            if (!elements.qualityBtn.contains(e.target) && !elements.qualityMenu.contains(e.target)) {
                elements.qualityMenu.classList.add('hidden');
            }
        }
    });
}

// =============================================
// Search Functions
// =============================================
function handleSearchInput(e) {
    const query = e.target.value.trim();

    if (state.searchTimeout) {
        clearTimeout(state.searchTimeout);
    }

    if (query.length < 2) {
        elements.searchResults.classList.remove('active');
        return;
    }

    state.searchTimeout = setTimeout(() => performSearch(query), 300);
}

async function performSearch(query) {
    elements.searchResults.innerHTML = '<div class="search-result-item" style="justify-content: center; color: var(--text-muted);">Mencari...</div>';
    elements.searchResults.classList.add('active');

    const results = await fetchSearch(query);

    if (results.length === 0) {
        elements.searchResults.innerHTML = '<div class="search-result-item" style="justify-content: center; color: var(--text-muted);">Tidak ada hasil</div>';
        return;
    }

    elements.searchResults.innerHTML = results.map(drama => `
        <div class="search-result-item" data-series-id="${drama.series_id}">
            <img class="search-result-thumb" src="${drama.thumbnail || ''}" alt="${drama.title}" onerror="this.style.display='none'">
            <div class="search-result-info">
                <h4>${drama.title}</h4>
                <span>Drama Series</span>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.search-result-item[data-series-id]').forEach(item => {
        item.addEventListener('click', () => {
            const drama = results.find(d => d.series_id === item.dataset.seriesId);
            if (drama) {
                openPlayer(drama);
                closeSearch();
            }
        });
    });
}

function closeSearch() {
    if (elements.searchBox) elements.searchBox.classList.remove('active');
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.searchResults) elements.searchResults.classList.remove('active');
}

// =============================================
// Player Functions
// =============================================
async function openPlayer(drama) {
    state.currentSeries = drama;

    elements.playerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    elements.playerTitle.textContent = drama.title;
    elements.descriptionText.textContent = 'Memuat...';
    elements.episodeList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-muted);">Memuat episode...</div>';

    const seriesInfo = await fetchSeriesInfo(drama.series_id);

    if (!seriesInfo) {
        showToast('Gagal memuat informasi series', 'error');
        closePlayer();
        return;
    }

    state.episodes = seriesInfo.episodes || [];
    state.currentEpisodeIndex = 0;

    if (seriesInfo.title && seriesInfo.title !== 'Unknown') {
        elements.playerTitle.textContent = seriesInfo.title;
    }

    elements.descriptionText.textContent = seriesInfo.description || 'Tidak ada deskripsi tersedia.';

    renderEpisodeList();

    if (state.episodes.length > 0) {
        playEpisode(0);
    } else {
        showToast('Tidak ada episode tersedia', 'error');
    }
}

function closePlayer() {
    elements.playerOverlay.classList.remove('active');
    document.body.style.overflow = '';

    elements.videoPlayer.pause();
    elements.videoPlayer.src = '';

    state.currentSeries = null;
    state.episodes = [];
    state.currentEpisodeIndex = 0;

    cancelAutoNext();
}

function renderEpisodeList() {
    const count = state.episodes.length;
    elements.episodeCount.textContent = `${count} Episode`;

    elements.episodeList.innerHTML = state.episodes.map((ep, index) => `
        <button class="episode-btn ${index === state.currentEpisodeIndex ? 'active' : ''}" data-index="${index}">
            ${ep.index}
        </button>
    `).join('');

    document.querySelectorAll('.episode-btn').forEach(btn => {
        btn.addEventListener('click', () => playEpisode(parseInt(btn.dataset.index)));
    });
}

async function playEpisode(index) {
    if (index < 0 || index >= state.episodes.length) return;

    state.currentEpisodeIndex = index;
    const episode = state.episodes[index];

    elements.playerEpisode.textContent = `Episode ${episode.index}`;
    updateEpisodeButtons();

    elements.videoLoading.classList.remove('hidden');

    const streamData = await fetchStream(episode.video_id);

    if (!streamData) {
        showToast('Gagal memuat video', 'error');
        elements.videoLoading.classList.add('hidden');
        return;
    }

    state.streamUrls = streamData;

    const availableQualities = Object.keys(streamData);

    // Auto-select highest quality available
    if (state.currentQuality === 'auto' || !availableQualities.includes(state.currentQuality)) {
        // Find highest quality available based on QUALITY_ORDER
        const bestQuality = QUALITY_ORDER.find(q => availableQualities.includes(q));
        state.currentQuality = bestQuality || availableQualities[0] || '720p';
    }

    updateQualityMenu(availableQualities);

    const videoUrl = streamData[state.currentQuality];
    if (videoUrl) {
        elements.videoPlayer.src = videoUrl;
        elements.videoPlayer.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    }
}

function updateEpisodeButtons() {
    document.querySelectorAll('.episode-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === state.currentEpisodeIndex);
    });

    const activeBtn = document.querySelector('.episode-btn.active');
    if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function playPreviousEpisode() {
    if (state.currentEpisodeIndex > 0) {
        cancelAutoNext();
        playEpisode(state.currentEpisodeIndex - 1);
    }
}

function playNextEpisode() {
    if (state.currentEpisodeIndex < state.episodes.length - 1) {
        cancelAutoNext();
        playEpisode(state.currentEpisodeIndex + 1);
    }
}

function updateQualityMenu(availableQualities) {
    document.querySelectorAll('.quality-menu button').forEach(btn => {
        const quality = btn.dataset.quality;
        const isAvailable = availableQualities.includes(quality);
        btn.disabled = !isAvailable;
        btn.classList.toggle('active', quality === state.currentQuality);
        btn.classList.toggle('unavailable', !isAvailable);
    });

    // Display quality with label
    const qualityLabel = getQualityLabel(state.currentQuality);
    elements.currentQuality.textContent = qualityLabel;
}

function getQualityLabel(quality) {
    const labels = {
        '2160p': '4K',
        '1440p': '2K',
        '1080p': 'FHD',
        '720p': 'HD',
        '540p': '540p',
        '480p': '480p',
        '360p': '360p',
        '240p': '240p'
    };
    return labels[quality] || quality;
}

function changeQuality(quality) {
    if (state.streamUrls && state.streamUrls[quality]) {
        const currentTime = elements.videoPlayer.currentTime;
        const wasPlaying = !elements.videoPlayer.paused;

        state.currentQuality = quality;
        elements.videoPlayer.src = state.streamUrls[quality];
        elements.videoPlayer.currentTime = currentTime;

        if (wasPlaying) {
            elements.videoPlayer.play();
        }

        updateQualityMenu(Object.keys(state.streamUrls));
        elements.qualityMenu.classList.add('hidden');

        const label = getQualityLabel(quality);
        showToast(`Kualitas: ${label} (${quality})`, 'success');
    }
}

function toggleQualityMenu() {
    elements.qualityMenu.classList.toggle('hidden');
}

// =============================================
// Video Player Functions
// =============================================
function setupVideoPlayer() {
    const video = elements.videoPlayer;
    if (!video) return;

    video.addEventListener('loadstart', () => {
        elements.videoLoading.classList.remove('hidden');
    });

    video.addEventListener('canplay', () => {
        elements.videoLoading.classList.add('hidden');
    });

    video.addEventListener('waiting', () => {
        elements.videoLoading.classList.remove('hidden');
    });

    video.addEventListener('playing', () => {
        elements.videoLoading.classList.add('hidden');
        updatePlayButton(true);
    });

    video.addEventListener('pause', () => {
        updatePlayButton(false);
    });

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('progress', updateBuffered);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('volumechange', updateVolumeUI);

    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.addEventListener('mousemove', () => {
            elements.videoControls.classList.add('visible');
            resetControlsTimeout();
        });

        videoWrapper.addEventListener('mouseleave', () => {
            if (!elements.videoPlayer.paused) {
                elements.videoControls.classList.remove('visible');
            }
        });
    }

    video.addEventListener('click', togglePlay);
    video.addEventListener('dblclick', toggleFullscreen);
}

function togglePlay() {
    if (elements.videoPlayer.paused) {
        elements.videoPlayer.play();
    } else {
        elements.videoPlayer.pause();
    }
}

function updatePlayButton(isPlaying) {
    const playIcon = elements.playBtn?.querySelector('.play-icon');
    const pauseIcon = elements.playBtn?.querySelector('.pause-icon');

    if (playIcon) playIcon.classList.toggle('hidden', isPlaying);
    if (pauseIcon) pauseIcon.classList.toggle('hidden', !isPlaying);
}

function updateProgress() {
    const video = elements.videoPlayer;
    const percent = (video.currentTime / video.duration) * 100;

    if (elements.progressFilled) elements.progressFilled.style.width = `${percent}%`;
    if (elements.progressThumb) elements.progressThumb.style.left = `${percent}%`;
    if (elements.currentTime) elements.currentTime.textContent = formatTime(video.currentTime);
}

function updateBuffered() {
    const video = elements.videoPlayer;
    if (video.buffered.length > 0 && elements.progressBuffered) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = (bufferedEnd / video.duration) * 100;
        elements.progressBuffered.style.width = `${percent}%`;
    }
}

function updateDuration() {
    if (elements.duration) {
        elements.duration.textContent = formatTime(elements.videoPlayer.duration);
    }
}

function handleProgressClick(e) {
    const rect = elements.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    elements.videoPlayer.currentTime = percent * elements.videoPlayer.duration;
}

function handleProgressHover(e) {
    const rect = elements.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (elements.progressThumb) elements.progressThumb.style.left = `${percent * 100}%`;
}

function toggleMute() {
    elements.videoPlayer.muted = !elements.videoPlayer.muted;
    updateVolumeUI();
}

function handleVolumeChange(e) {
    elements.videoPlayer.volume = e.target.value;
    elements.videoPlayer.muted = false;
    updateVolumeUI();
}

function updateVolumeUI() {
    const video = elements.videoPlayer;
    const volumeIcon = elements.muteBtn?.querySelector('.volume-icon');
    const muteIcon = elements.muteBtn?.querySelector('.mute-icon');

    if (volumeIcon) volumeIcon.classList.toggle('hidden', video.muted || video.volume === 0);
    if (muteIcon) muteIcon.classList.toggle('hidden', !video.muted && video.volume > 0);

    if (elements.volumeSlider) elements.volumeSlider.value = video.muted ? 0 : video.volume;
}

function toggleFullscreen() {
    const wrapper = document.querySelector('.video-wrapper');

    if (document.fullscreenElement) {
        document.exitFullscreen();
        updateFullscreenButton(false);
    } else if (wrapper) {
        wrapper.requestFullscreen();
        updateFullscreenButton(true);
    }
}

function updateFullscreenButton(isFullscreen) {
    const expandIcon = elements.fullscreenBtn?.querySelector('.expand-icon');
    const compressIcon = elements.fullscreenBtn?.querySelector('.compress-icon');

    if (expandIcon) expandIcon.classList.toggle('hidden', isFullscreen);
    if (compressIcon) compressIcon.classList.toggle('hidden', !isFullscreen);
}

async function togglePiP() {
    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            await elements.videoPlayer.requestPictureInPicture();
        }
    } catch (error) {
        console.error('PiP error:', error);
        showToast('Picture-in-Picture tidak tersedia', 'error');
    }
}

function resetControlsTimeout() {
    if (state.controlsTimeout) {
        clearTimeout(state.controlsTimeout);
    }

    state.controlsTimeout = setTimeout(() => {
        if (!elements.videoPlayer.paused) {
            elements.videoControls.classList.remove('visible');
        }
    }, 3000);
}

// =============================================
// Auto Next Episode
// =============================================
function handleVideoEnded() {
    if (!state.autoNext) return;

    if (state.currentEpisodeIndex < state.episodes.length - 1) {
        startAutoNextCountdown();
    } else {
        showToast('Semua episode telah selesai!', 'success');
    }
}

function startAutoNextCountdown() {
    state.countdown = 5;
    elements.countdownEl.textContent = state.countdown;
    elements.nextEpisodeOverlay.classList.remove('hidden');

    state.countdownInterval = setInterval(() => {
        state.countdown--;
        elements.countdownEl.textContent = state.countdown;

        if (state.countdown <= 0) {
            cancelAutoNext();
            playNextEpisode();
        }
    }, 1000);
}

function cancelAutoNext() {
    if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
    }
    elements.nextEpisodeOverlay.classList.add('hidden');
}

// =============================================
// Keyboard Shortcuts
// =============================================
function handleKeyboard(e) {
    if (!elements.playerOverlay.classList.contains('active')) return;
    if (e.target.tagName === 'INPUT') return;

    switch (e.key) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlay();
            break;
        case 'f':
            toggleFullscreen();
            break;
        case 'm':
            toggleMute();
            break;
        case 'ArrowLeft':
            elements.videoPlayer.currentTime -= 10;
            break;
        case 'ArrowRight':
            elements.videoPlayer.currentTime += 10;
            break;
        case 'ArrowUp':
            e.preventDefault();
            elements.videoPlayer.volume = Math.min(1, elements.videoPlayer.volume + 0.1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            elements.videoPlayer.volume = Math.max(0, elements.videoPlayer.volume - 0.1);
            break;
        case 'n':
            playNextEpisode();
            break;
        case 'p':
            playPreviousEpisode();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                closePlayer();
            }
            break;
    }
}

// =============================================
// Utility Functions
// =============================================
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.addEventListener('fullscreenchange', () => {
    updateFullscreenButton(!!document.fullscreenElement);
});
