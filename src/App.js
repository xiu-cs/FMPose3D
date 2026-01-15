import React, { useEffect, useMemo, useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './App.css';
import Plot from 'react-plotly.js';
import JSZip from 'jszip';

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

const HUMAN_CONNECTIONS = [
  [0, 1], [0, 4], [1, 2], [4, 5],
  [2, 3], [5, 6], [0, 7], [7, 8],
  [8, 14], [8, 11], [14, 15], [15, 16],
  [11, 12], [12, 13], [8, 9], [9, 10],
];

const ANIMAL_CONNECTIONS = [
  [24, 0], [24, 1], [1, 21], [0, 20], [24, 2], [2, 22], [2, 23],
  [24, 18], [18, 12], [18, 13], [12, 8], [13, 9], [8, 14], [9, 15],
  [14, 3], [15, 4], [18, 7], [7, 10], [7, 11], [10, 16], [11, 17],
  [16, 5], [17, 6], [7, 25], [25, 19],
];

const POSE_PALETTE = [
  '#2563eb', '#f97316', '#10b981', '#e11d48',
  '#0ea5e9', '#9333ea', '#ef4444', '#14b8a6'
];

const plotConfig = {
  responsive: true,
  displaylogo: false,
  scrollZoom: true,
  modeBarButtonsToRemove: ['toImage', 'lasso3d', 'select3d']
};

const axisTemplate = {
  title: '',
  showgrid: true,
  gridcolor: '#e5e7eb',
  zeroline: false,
  showticklabels: false,
  showbackground: true,
  backgroundcolor: '#f8fafc',
  showspikes: false
};

const buildPoseTraces = (poses, connections = HUMAN_CONNECTIONS) => {
  return poses.flatMap((pose, idx) => {
    const color = POSE_PALETTE[idx % POSE_PALETTE.length];
    const x = pose.map(p => p[0]);
    const y = pose.map(p => p[1]);
    const z = pose.map(p => p[2]);

    const hovertext = pose.map((point, jointIdx) =>
      `<b>Joint ${jointIdx}</b><br>x: ${point[0].toFixed(2)}<br>y: ${point[1].toFixed(2)}<br>z: ${point[2].toFixed(2)}`
    );

    const scatterTrace = {
      type: 'scatter3d',
      mode: 'markers',
      name: `Pose ${idx + 1}`,
      x,
      y,
      z,
      marker: {
        size: 4,
        color,
        opacity: 0.9,
        line: { width: 1, color: '#111827' }
      },
      hovertext,
      hoverinfo: 'text',
      showlegend: false
    };

    const lineTraces = connections
      .filter(([a, b]) => a < pose.length && b < pose.length)
      .map(([a, b]) => ({
        type: 'scatter3d',
        mode: 'lines',
        x: [pose[a][0], pose[b][0]],
        y: [pose[a][1], pose[b][1]],
        z: [pose[a][2], pose[b][2]],
        line: { color, width: 3 },
        opacity: 0.45,
        hoverinfo: 'none',
        showlegend: false
      }));

    return [scatterTrace, ...lineTraces];
  });
};

const buildPoseLayout = (camera) => ({
  margin: { l: 0, r: 0, t: 0, b: 0 },
  scene: {
    xaxis: axisTemplate,
    yaxis: axisTemplate,
    zaxis: axisTemplate,
    bgcolor: '#ffffff',
    aspectmode: 'data',
    camera: camera || { eye: { x: 1.6, y: 1.35, z: 1.25 } }
  },
  paper_bgcolor: 'white',
  plot_bgcolor: 'white',
  showlegend: false,
  hovermode: 'closest'
});

const applyOffset = (pose, offset) =>
  pose.map(([x, y, z]) => [x + offset[0], y + offset[1], z + offset[2]]);

const parseHeaderStr = (str) => {
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}');
  const core = start >= 0 && end >= 0 ? str.slice(start, end + 1) : str;
  const json = core
    .trim()
    .replace(/'/g, '"')
    .replace(/\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/,]/g, ']')
    .replace(/,]/g, ']')
    .replace(/,\s*}/g, '}')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false');
  return JSON.parse(json);
};

const typedArrayCtor = (descr) => {
  switch (descr) {
    case '<f8':
      return Float64Array;
    case '<f4':
      return Float32Array;
    case '<i4':
      return Int32Array;
    case '<i2':
      return Int16Array;
    case '|u1':
      return Uint8Array;
    default:
      throw new Error(`Unsupported dtype: ${descr}`);
  }
};

const reorderFortranToC = (data, shape) => {
  const total = data.length;
  const dest = new data.constructor(total);
  const dims = shape.length;
  const strideF = new Array(dims).fill(0);
  strideF[0] = 1;
  for (let i = 1; i < dims; i += 1) {
    strideF[i] = strideF[i - 1] * shape[i - 1];
  }
  for (let idx = 0; idx < total; idx += 1) {
    // convert C-order linear idx to multi-index
    let cIdx = idx;
    const multi = new Array(dims);
    for (let dim = dims - 1; dim >= 0; dim -= 1) {
      multi[dim] = cIdx % shape[dim];
      cIdx = Math.floor(cIdx / shape[dim]);
    }
    // map to Fortran-order linear idx
    let fIdx = 0;
    for (let dim = 0; dim < dims; dim += 1) {
      fIdx += multi[dim] * strideF[dim];
    }
    dest[idx] = data[fIdx];
  }
  return dest;
};

const parseNpy = (buffer) => {
  const dv = new DataView(buffer);
  const magic =
    String.fromCharCode(dv.getUint8(0)) +
    String.fromCharCode(dv.getUint8(1)) +
    String.fromCharCode(dv.getUint8(2)) +
    String.fromCharCode(dv.getUint8(3)) +
    String.fromCharCode(dv.getUint8(4)) +
    String.fromCharCode(dv.getUint8(5));
  if (magic !== '\x93NUMPY') {
    throw new Error('Not a NPY file');
  }
  const major = dv.getUint8(6);
  const minor = dv.getUint8(7);
  const littleEndian = true;
  const headerLen = major <= 1 ? dv.getUint16(8, littleEndian) : dv.getUint32(8, littleEndian);
  const headerStart = major <= 1 ? 10 : 12;
  const headerTxt = new TextDecoder('ascii').decode(
    new Uint8Array(buffer, headerStart, headerLen)
  );
  const header = parseHeaderStr(headerTxt);
  if (!header.descr.startsWith('<') && !header.descr.startsWith('|')) {
    throw new Error(`Only little-endian/byte-aligned dtypes supported, got ${header.descr}`);
  }
  const ctor = typedArrayCtor(header.descr);
  const dataOffset = headerStart + headerLen;
  const data = new ctor(buffer, dataOffset);
  const flat = header.fortran_order ? reorderFortranToC(data, header.shape) : data;
  return { data: flat, shape: header.shape };
};

const reshapePose = (data, shape) => {
  if (!shape || shape.length < 2 || shape[1] !== 3) {
    throw new Error(`Unsupported pose shape: ${shape}`);
  }
  const pose = [];
  for (let i = 0; i < shape[0]; i += 1) {
    pose.push([
      data[i * 3 + 0],
      data[i * 3 + 1],
      data[i * 3 + 2],
    ]);
  }
  return pose;
};

const loadPoseFromNpz = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pose file: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);
  const npyFileName = Object.keys(zip.files).find(name => name.endsWith('.npy'));
  if (!npyFileName) {
    throw new Error('NPZ file does not contain an .npy array');
  }
  const npyBuffer = await zip.files[npyFileName].async('arraybuffer');
  const parsed = parseNpy(npyBuffer);
  return reshapePose(parsed.data, parsed.shape);
};

const offsetPose = (pose, offset) =>
  pose.map(([x, y, z]) => [x + offset[0], y + offset[1], z + offset[2]]);

const SAMPLES = [
  {
    id: 'human-running',
    title: 'Human',
    poseTitle: '3D Pose',
    imageSrc: `${process.env.PUBLIC_URL}/static/3d_predictions/humans/running/pose2D/0000_2D.png`,
    posePath: `${process.env.PUBLIC_URL}/static/3d_predictions/humans/running/pose3D/0000_3D.npz`,
    connections: HUMAN_CONNECTIONS,
  },
  {
    id: 'human-basketball',
    title: 'Human',
    poseTitle: '3D Pose',
    imageSrc: `${process.env.PUBLIC_URL}/static/3d_predictions/humans/Golf_3dpw/pose2D/0000_2D.png`,
    posePath: `${process.env.PUBLIC_URL}/static/3d_predictions/humans/Golf_3dpw/pose3D/0000_3D.npz`,
    connections: HUMAN_CONNECTIONS,
  },
  {
    id: 'animal-dog',
    title: 'Animal',
    poseTitle: '3D Pose',
    imageSrc: `${process.env.PUBLIC_URL}/static/3d_predictions/animals/dog/pose2D_on_image/0000_2d.png`,
    posePath: `${process.env.PUBLIC_URL}/static/3d_predictions/animals/dog/pose3D/0000_3D.npz`,
    connections: ANIMAL_CONNECTIONS,
  },
  {
    id: 'animal-cow',
    title: 'Animal',
    poseTitle: '3D Pose',
    imageSrc: `${process.env.PUBLIC_URL}/static/3d_predictions/animals/000000129100_cow/pose2D_on_image/0000_2d.png`,
    posePath: `${process.env.PUBLIC_URL}/static/3d_predictions/animals/000000129100_cow/pose3D/0000_3D.npz`,
    connections: ANIMAL_CONNECTIONS,
  },
];

function PoseViewerCard({ title, poses, camera, imageSrc, hideImage = false, connections }) {
  const traces = useMemo(() => buildPoseTraces(poses, connections), [poses, connections]);
  const layout = useMemo(() => buildPoseLayout(camera), [camera]);

  return (
    <div className="pose-card">
      <h3 className="title is-5 pose-card-title">{title}</h3>
      {!hideImage && (
        <div className="pose-card-image">
          <img src={imageSrc} alt={title} className="pose-image" />
        </div>
      )}
      <div className="pose-plot-wrapper">
        <Plot
          data={traces}
          layout={layout}
          config={plotConfig}
          className="pose-plot"
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </div>
    </div>
  );
}

function ImageCard({ title, imageSrc }) {
  return (
    <div className="pose-card">
      <h3 className="title is-5 pose-card-title">{title}</h3>
      <div className="pose-card-image">
        <img src={imageSrc} alt={title} className="pose-image" />
      </div>
    </div>
  );
}

function App() {
  const demoImage = {
    src: `${process.env.PUBLIC_URL}/static/images/predictions.jpg`,
    alt: 'Predictions',
  };

  const [poseMap, setPoseMap] = useState({});
  const [poseLoading, setPoseLoading] = useState(true);
  const [poseError, setPoseError] = useState('');

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

  useEffect(() => {
    let isMounted = true;
    const loadAll = async () => {
      setPoseLoading(true);
      setPoseError('');
      try {
        const results = await Promise.allSettled(
          SAMPLES.map(async (sample) => {
            const pose = await loadPoseFromNpz(sample.posePath);
            return { id: sample.id, pose };
          })
        );
        const nextMap = {};
        const errors = [];
        results.forEach((res, idx) => {
          if (res.status === 'fulfilled') {
            nextMap[res.value.id] = res.value.pose;
          } else {
            errors.push(`${SAMPLES[idx].title}: ${res.reason?.message || 'load failed'}`);
          }
        });
        if (isMounted) {
          setPoseMap(nextMap);
          if (errors.length) setPoseError(errors.join('; '));
        }
      } catch (err) {
        if (isMounted) {
          setPoseError(err?.message || 'Failed to load pose files');
        }
      } finally {
        if (isMounted) {
          setPoseLoading(false);
        }
      }
    };
    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const demoModules = useMemo(() => {
    const modules = [];
    SAMPLES.forEach((sample) => {
      modules.push({
        type: 'image',
        id: `${sample.id}-img`,
        title: sample.title,
        imageSrc: sample.imageSrc,
        order: sample.id,
      });
      modules.push({
        type: 'pose',
        id: `${sample.id}-pose`,
        title: sample.poseTitle,
        sampleId: sample.id,
        camera: undefined,
        connections: sample.connections,
      });
    });
    return modules;
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
              {/* Demo image temporarily hidden */}
              {poseLoading && (
                <p className="pose-status pose-loading">Loading 3D pose from NPZ…</p>
              )}
              {poseError && (
                <p className="pose-status pose-error">Failed to load pose: {poseError}</p>
              )}
              <div className="pose-viewers-grid four-wide">
                {demoModules.map(module => {
                  if (module.type === 'image') {
                    return (
                      <ImageCard
                        key={module.id}
                        title={module.title}
                        imageSrc={module.imageSrc}
                      />
                    );
                  }
                  const pose = poseMap[module.sampleId];
                  if (!pose) {
                    return (
                      <div key={module.id} className="pose-card">
                        <h3 className="title is-5 pose-card-title">{module.title}</h3>
                        <p className="pose-status pose-loading">Loading pose…</p>
                      </div>
                    );
                  }
                  return (
                    <PoseViewerCard
                      key={module.id}
                      title={module.title}
                      poses={[pose]}
                      camera={module.camera}
                      hideImage
                      connections={module.connections}
                    />
                  );
                })}
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
  author={Wang, Ti and Yu, Xiaohang and Mathis, Mackenzie W.},
  journal={arXiv preprint},
  year={2025}
}`}</code></pre>
        </div>
      </section>
    </div>
  );
}

export default App; 
