import React, { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './App.css';

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
  const demoImage = {
    src: `${process.env.PUBLIC_URL}/static/images/predictions.jpg`,
    alt: 'Predictions',
  };

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
                  <div className="gallery-frame">
                    <img 
                      src={demoImage.src} 
                      alt={demoImage.alt} 
                      className="gallery-image"
                    />
                    <p className="image-caption">{demoImage.alt}</p>
                  </div>
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
                    src={`${process.env.PUBLIC_URL}/static/images/training_pipeline.jpg`} 
                    alt="Training pipeline"
                    className="result-image"
                  />
                  <p className="figure-caption">
                    <strong>Overview of the training process.</strong> The process
                    starts from a noise sample{' '}
                    <InlineMath math={'x_0 \\sim \\mathcal{N}(0, I)'} /> and a
                    ground-truth 3D pose <InlineMath math={'x_1'} /> from the training
                    set. An intermediate sample <InlineMath math={'x_t'} /> is obtained
                    by linear interpolation between <InlineMath math={'x_0'} /> and{' '}
                    <InlineMath math={'x_1'} />. The red region illustrates the valid
                    3D pose data manifold. The network{' '}
                    <InlineMath math={'v_\\theta(x_t, t, c)'} />, conditioned on the 2D
                    pose <InlineMath math={'c = x^{2D}'} />, is trained to predict the
                    true velocity <InlineMath math={'v_t'} />. The Flow Matching loss{' '}
                    <InlineMath math={'\\mathcal{L}_{\\text{CFM}} = \\lVert v_\\theta - v_t \\rVert_2^2'} />{' '}
                    minimizes the discrepancy between the predicted and ground-truth
                    velocities.
                  </p>
                </div>
                <div className="result-image-wrapper">
                  <img 
                    src={`${process.env.PUBLIC_URL}/static/images/inference_pipeline.png`} 
                    alt="Inference pipeline"
                    className="result-image"
                  />
                  <p className="figure-caption">
                    <strong>Overview of the inference process.</strong>
                    At inference time, we initialize the state with{' '}
                    <InlineMath math={'x_0 \\sim \\mathcal{N}(0, I)'} /> and integrate
                    the learned velocity field from <InlineMath math={'t = 0'} /> to{' '}
                    <InlineMath math={'t = 1'} /> to obtain the predicted 3D pose{' '}
                    <InlineMath math={'x_1'} />.
                    <BlockMath math={'x_1 = x_0 + \\int_{0}^{1} v_\\theta(x_t, t, c)\\, dt'} />
                    In practice, this continuous-time integral is approximated with{' '}
                    <InlineMath math={'S'} /> discrete steps (step size{' '}
                    <InlineMath math={'\\Delta t = 1 / S'} />):
                    <BlockMath math={'x_{t+\\tfrac{1}{S}} = x_t + \\tfrac{1}{S}\\, v_\\theta\\!\\left(x_t, t, c\\right), \\quad t \\in \\left\\{0, \\tfrac{1}{S}, \\dots, 1 - \\tfrac{1}{S}\\right\\}'} />
                    For example, when <InlineMath math={'S = 3'} />, the process takes
                    three steps to move from <InlineMath math={'x_0'} /> to{' '}
                    <InlineMath math={'x_1'} />.
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
          <pre><code>{`@article{XXXX,
  title={FMPose: 3D Pose Estimation via Flow Matching},
  author={Wang, Ti and Yu, Xiaohang and Mathis, Mackenzie},
  journal={arXiv preprint},
  year={2025}
}`}</code></pre>
        </div>
      </section>
    </div>
  );
}

export default App; 
