// pages/dashboard.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user ?? null;

        if (!user) {
          // لو مافي مستخدم، رجع لصفحة الدخول
          window.location.href = '/';
          return;
        }

        setUserEmail(user.email || '');
      } catch (e) {
        console.error(e);
        window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  async function logout() {
    try {
      await supabase.auth.signOut();
    } finally {
      window.location.href = '/';
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#050609',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050609',
        color: '#fff',
        padding: '16px'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >
        <h1 style={{ margin: 0 }}>لوحة SIRA AI</h1>
        <button
          onClick={logout}
          style={{
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.4)',
            background: 'transparent',
            color: '#fff',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          تسجيل الخروج
        </button>
      </header>

      <p>مرحباً {userEmail || 'بك'} 👋</p>
      <p>هذه لوحة بسيطة، نضيف عليها القائمة الجانبية والشات لاحقًا خطوة خطوة.</p>
    </div>
  );
}
