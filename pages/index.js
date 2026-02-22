// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // بعد الدخول لو فيه session يودّي المستخدم لـ /dashboard
  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user ?? null;
        if (user) {
          window.location.href = '/dashboard';
          return;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setChecking(false);
      }
    };
    run();
  }, []);

  async function loginWithGoogle() {
    setErrorMsg('');
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) {
        console.error(error);
        setErrorMsg(error.message || 'حدث خطأ في تسجيل الدخول.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="wrap">
      <div className="stars s1" />
      <div className="stars s2" />
      <div className="stars s3" />
      <div className="glow" />

      <div className="center">
        <div className="card">
          <h1 className="title">SIRA AI</h1>
          <p className="subtitle">بوابة تسجيل الدخول</p>

          {errorMsg ? <div className="errorBox">{errorMsg}</div> : null}

          <button
            type="button"
            className="btn googleBtn"
            onClick={loginWithGoogle}
            disabled={busy || checking}
          >
            <span className="gIcon">G</span>
            <span>
              {checking
                ? 'جاري التحقق...'
                : busy
                ? 'جارٍ فتح Google...'
                : 'متابعة عبر Google'}
            </span>
          </button>

          <p className="hint">
            تأكد أن بريدك مضاف في Google Login داخل Supabase و Google Cloud.
          </p>
        </div>
      </div>

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
          height: 100%;
        }
        :global(body) {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
          background: #050609;
          color: #fff;
        }

        .wrap {
          position: relative;
          min-height: 100vh;
          padding: 24px;
          overflow: hidden;
          background: radial-gradient(
              1200px 800px at 50% 30%,
              rgba(255, 200, 0, 0.12),
              transparent 60%
            ),
            radial-gradient(
              900px 600px at 20% 80%,
              rgba(120, 190, 255, 0.1),
              transparent 55%
            ),
            #050607;
        }

        .stars {
          position: absolute;
          inset: -20%;
          background-repeat: repeat;
          pointer-events: none;
        }
        .s1 {
          background-image: radial-gradient(
              2px 2px at 10px 20px,
              rgba(255, 255, 255, 0.9),
              transparent
            ),
            radial-gradient(
              2px 2px at 60px 90px,
              rgba(255, 255, 255, 0.8),
              transparent
            );
          background-size: 260px 260px;
          animation: drift1 70s linear infinite;
          opacity: 0.45;
        }
        .s2 {
          background-image: radial-gradient(
              3px 3px at 30px 50px,
              rgba(255, 255, 255, 0.95),
              transparent
            ),
            radial-gradient(
              2px 2px at 170px 120px,
              rgba(255, 255, 255, 0.85),
              transparent
            );
          background-size: 320px 320px;
          animation: drift2 90s linear infinite;
          opacity: 0.26;
        }
        .s3 {
          background-image: radial-gradient(
              2px 2px at 15px 15px,
              rgba(255, 255, 255, 0.7),
              transparent
            ),
            radial-gradient(
              2px 2px at 240px 80px,
              rgba(255, 255, 255, 0.7),
              transparent
            );
          background-size: 420px 420px;
          animation: drift3 120s linear infinite;
          opacity: 0.18;
        }

        @keyframes drift1 {
          to {
            transform: translateY(-300px);
          }
        }
        @keyframes drift2 {
          to {
            transform: translateY(-520px);
          }
        }
        @keyframes drift3 {
          to {
            transform: translateY(-760px);
          }
        }

        .glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            600px 400px at 50% 40%,
            rgba(255, 200, 0, 0.16),
            transparent 60%
          );
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        .center {
          position: relative;
          z-index: 2;
          min-height: calc(100vh - 48px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: 360px;
          max-width: 94vw;
          padding: 28px 24px;
          border-radius: 24px;
          background: rgba(15, 16, 18, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.7),
            0 0 55px rgba(255, 200, 0, 0.18);
          text-align: center;
        }

        .title {
          margin: 0;
          font-size: 32px;
          letter-spacing: 6px;
          color: rgba(255, 210, 60, 0.98);
        }

        .subtitle {
          margin-top: 6px;
          margin-bottom: 18px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        .btn {
          width: 100%;
          height: 48px;
          border-radius: 999px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .googleBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #ffffff;
          color: #111;
        }

        .googleBtn:disabled {
          opacity: 0.7;
          cursor: default;
        }

        .gIcon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          color: #4285f4;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .hint {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
        }

        .errorBox {
          margin-bottom: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 120, 120, 0.4);
          background: rgba(255, 80, 80, 0.1);
          color: rgba(255, 220, 220, 0.95);
          font-size: 13px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
