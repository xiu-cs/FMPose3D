import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import videoData from './demo.json';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start" style={{ flexGrow: 1, justifyContent: 'center' }}>
          <a className="navbar-item" href="https://www.mackenziemathislab.org">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Our Related Research</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="https://github.com/AdaptiveMotorControlLab/AmadeusGPT">
                AmadeusGPT
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h1 className="title is-1 publication-title">
              FMPose: 3D Pose Estimation via Flow Matching
              </h1>
              <div className="is-size-5 publication-authors">
                <span className="author-block">
                  <a href="https://xiu-cs.github.io/">Ti Wang</a><sup>1</sup>
                </span>
                <span className="author-block">
                  <a href="https://people.epfl.ch/xiaohang.yu?lang=en">Xiaohang Yu</a><sup>1</sup>
                </span>
                <span className="author-block">
                  <a href="https://www.mackenziemathislab.org/">Mackenzie Mathis</a><sup>1</sup>
                </span>
              </div>
              <div className="is-size-5 publication-authors">
                <span className="author-block"><sup>1</sup>EPFL </span>
              </div>
              <div className="publication-links">
                <span className="link-block">
                  <a href="http://arxiv.org/abs/2503.18712" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="fas fa-file-pdf"></i>
                    </span>
                    <span>Paper</span>
                  </a>
                </span>
                <span className="link-block">
                  <a href="https://github.com/AdaptiveMotorControlLab/LLaVAction" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Code</span>
                  </a>
                </span>
                <span className="link-block">
                  <a href="https://huggingface.co/MLAdaptiveIntelligence/LLaVAction-7B" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="far fa-images"></i>
                    </span>
                    <span>Data</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Abstract() {
  return (
    <section className="section">
      <div className="container is-max-desktop">
        <div className="columns is-centered has-text-centered">
          <div className="column is-four-fifths">
            <h2 className="title is-3">Abstract</h2>
            <div className="abstract-text">
              Monocular 3D pose estimation is fundamentally ill-posed due to depth
              ambiguity and occlusions, thereby motivating probabilistic methods that
              generate multiple plausible 3D pose hypotheses. In particular,
              diffusion-based models have demonstrated strong performance, but their
              iterative denoising process typically requires many time steps for each
              prediction, making inference computationally expensive. In contrast,
              Flow Matching (FM) learns an ODE-based velocity field, enabling
              efficient generation of 3D pose samples with only a few integration
              steps. Inspired by this capability, we propose a novel generative pose
              estimation framework, <strong>FMPose</strong>, that formulates 3D pose
              estimation as a conditional distribution transport problem. It
              continuously transports samples from a standard Gaussian prior to the
              distribution of plausible 3D poses conditioned on 2D inputs. While the
              ODE trajectories are deterministic, FMPose naturally generates diverse
              pose hypotheses by sampling different noise seeds. To obtain a single
              accurate prediction from those hypotheses, we further introduce a
              <strong> Reprojection-based Posterior Expectation Aggregation (RPEA)
              </strong> module, which approximates the Bayesian posterior expectation
              over 3D hypotheses. FMPose surpasses existing methods on the widely used
              human pose estimation benchmarks Human3.6M and MPI-INF-3DHP, and further
              achieves state-of-the-art performance on the 3D animal pose datasets
              Animal3D and CtrlAni3D, demonstrating strong performance across both
              human and animal 3D pose domains.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState('multiple-choice'); // 'multiple-choice' or 'descriptive'
  const videoKeys = Object.keys(videoData);
  const currentVideo = videoData[videoKeys[currentVideoIndex]];
  
  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoKeys.length);
  };
  
  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoKeys.length) % videoKeys.length);
  };
  
  useEffect(() => {
    // Check if all videos in demo.json have corresponding folders
    const missingVideos = videoKeys.filter(key => {
      const video = document.createElement('video');
      video.src = `${process.env.PUBLIC_URL}/videos/${key}/video.mp4`;
      return video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
    });
    
    if (missingVideos.length > 0) {
      console.warn('Missing videos for these keys:', missingVideos);
    }
  }, []);
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevVideo();
      if (e.key === 'ArrowRight') goToNextVideo();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    // Check if icon files exist
    const iconFiles = ['llavaction.svg', 'chatgpt.png'];
    iconFiles.forEach(file => {
      const img = new Image();
      img.onload = () => console.log(`Icon loaded successfully: ${file}`);
      img.onerror = () => console.error(`Failed to load icon: ${file}`);
      img.src = `${process.env.PUBLIC_URL}/icons/${file}`;
    });
  }, []);
  
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Abstract />
      
      <section className="section" id="demo">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-full-width">
              <h2 className="title is-3">Demo</h2>
              <div className="content">
                <div className="video-container">
                  <div className="video-navigation">
                    <button 
                      className="nav-arrow nav-arrow-left" 
                      onClick={goToPrevVideo}
                      aria-label="Previous video"
                    >
                      <span>&#10094;</span>
                    </button>
                    
                    <VideoPlayer videoId={videoKeys[currentVideoIndex]} />
                    
                    <button 
                      className="nav-arrow nav-arrow-right" 
                      onClick={goToNextVideo}
                      aria-label="Next video"
                    >
                      <span>&#10095;</span>
                    </button>
                  </div>
                  
                  <div className="dot-indicators">
                    {videoKeys.map((key, index) => (
                      <button
                        key={key}
                        className={`dot ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentVideoIndex(index)}
                        aria-label={`Go to video ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="data-container">
                  <div className="display-mode-toggle">
                    <button 
                      className={displayMode === 'multiple-choice' ? 'active' : ''}
                      onClick={() => setDisplayMode('multiple-choice')}
                    >
                      Multiple Choice
                    </button>
                    <button 
                      className={displayMode === 'descriptive' ? 'active' : ''}
                      onClick={() => setDisplayMode('descriptive')}
                    >
                      Descriptive
                    </button>
                  </div>
                  
                  <DataDisplay 
                    data={currentVideo} 
                    displayMode={displayMode} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="results">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-full-width">
              <h2 className="title is-3">Overview</h2>
              <div className="results-container">
                <div className="result-image-wrapper">
                  <img 
                    src={`${process.env.PUBLIC_URL}/static/images/fig1.png`} 
                    alt="LLaVAction-7B results."
                    className="result-image"
                  />
                  <p className="figure-caption">
                    <strong>LLaVAction-7B:</strong> Top: Qualitative inspection of distractors. We show an example clip with labels from random choices (which empirically is easy to solve), vs. our proposed harder benchmark with action labels generated by TIM. Our hard example generation strategy can 
                    automatically explore challenges such as temporal order and similar objects that are emphasized in other benchmarks. Bottom: Note, while GPT-4o is very good at random choices, it suffers in the harder benchmarking regime, and our method, LLaVAction outperforms the GPT-4o models.
                  </p>
                </div>
                <div className="result-image-wrapper">
                  <img 
                    src={`${process.env.PUBLIC_URL}/static/images/overview.png`} 
                    alt="Result visualization 2"
                    className="result-image"
                  />
                  <p className="figure-caption">
                    <strong>LLaVAction-7B pipeline:</strong>  Our full model includes an action token and additional auxiliary visual tasks, as noted. Inputs are shown for a given video clip. The responses are from the direction prediction, GPT-4o distillation, and the adversarial MQA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="BibTeX">
        <div className="container is-max-desktop content">
          <h2 className="title">BibTeX</h2>
          <pre><code>{`@article{YeQi2025llavaction,
  title={LLaVAction: evaluating and training multi-modal large language models for action recognition},
  author={Ye, Shaokai and Qi, Haozhe and Mathis, Alexander and Mathis, Mackenzie W.},
  journal={arXiv preprint},
  year={2025}
}`}</code></pre>
        </div>
      </section>
    </div>
  );
}

function VideoPlayer({ videoId }) {
  const videoSrc = `${process.env.PUBLIC_URL}/videos/${videoId}/video.mp4`;
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(0.5); // Default to half speed
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [videoId, playbackRate]);
  
  return (
    <div className="video-player">
      <video 
        ref={videoRef}
        key={videoId} 
        controls 
        autoPlay 
        loop
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="video-id">{videoId}</p>
      <div className="playback-controls">
        <button onClick={() => setPlaybackRate(rate => Math.max(0.1, rate - 0.1))}>Slower</button>
        <span>{playbackRate.toFixed(1)}x</span>
        <button onClick={() => setPlaybackRate(rate => Math.min(2, rate + 0.1))}>Faster</button>
      </div>
    </div>
  );
}

function DataDisplay({ data, displayMode }) {
  return (
    <div className="data-display">
      <div className="ground-truth">
        <h3>Ground Truth Action:</h3>
        <p>{data.gt}</p>
      </div>
      
      {displayMode === 'multiple-choice' ? (
        <div className="multiple-choice">
          <div className="model-legend">
            <div className="model-item">
              <img 
                src={`${process.env.PUBLIC_URL}/icons/llavaction.svg`} 
                alt="LLaVAction" 
                className="model-icon llavaction-icon"
              />
              <span>LLaVAction</span>
            </div>
            <div className="model-item">
              <img 
                src={`${process.env.PUBLIC_URL}/icons/chatgpt.png`} 
                alt="ChatGPT" 
                className="model-icon"
              />
              <span>ChatGPT</span>
            </div>
          </div>
          
          <h3>Action Options:</h3>
          <ul>
            {data.llavaction_options.map((option, index) => {
              // Determine which models predicted this option
              const isLlavPrediction = option === data.llavaction_pred;
              const isChatGptPrediction = option === data.tim_chatgpt_pred;
              
              return (
                <li 
                  key={index}
                  className={`
                    ${isLlavPrediction ? 'llav-highlighted' : ''}
                    ${isChatGptPrediction ? 'chatgpt-highlighted' : ''}
                  `}
                >
                  <span>{option}</span>
                  
                  <div className="prediction-icons">
                    {isLlavPrediction && (
                      <img 
                        src={`${process.env.PUBLIC_URL}/icons/llavaction.svg`} 
                        alt="LLaVAction prediction" 
                        className="prediction-icon llavaction-icon"
                      />
                    )}
                    
                    {isChatGptPrediction && (
                      <img 
                        src={`${process.env.PUBLIC_URL}/icons/chatgpt.png`} 
                        alt="ChatGPT prediction" 
                        className="prediction-icon"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="descriptive">
          <div className="open-ended">
            <h3>Objects Visible:</h3>
            <p>{data.open_ended}</p>
          </div>
          <div className="caption">
            <h3>Action Description:</h3>
            <p>{data.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 
