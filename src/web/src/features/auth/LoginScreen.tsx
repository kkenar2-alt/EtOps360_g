import { LogIn, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ComboField } from '../../components/ComboField'
import { etOpsApi } from '../../lib/api'
import type { LoginOptions, LoginResponse } from '../../types/etops'

type LoginScreenProps = {
  onLogin: (session: LoginResponse) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [options, setOptions] = useState<LoginOptions | null>(null)
  const [userName, setUserName] = useState('')
  const [branchId, setBranchId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    etOpsApi
      .loginOptions()
      .then((result) => {
        setOptions(result)
        const firstProfile = result.profiles[0]
        if (firstProfile) {
          setUserName(firstProfile.userName)
          setBranchId(firstProfile.defaultBranchId)
        }
      })
      .catch(() => setError('Giris secenekleri API uzerinden alinamadi.'))
  }, [])

  const activeProfile = useMemo(
    () => options?.profiles.find((profile) => profile.userName === userName),
    [options?.profiles, userName],
  )

  const allowedBranches = useMemo(() => {
    if (!options || !activeProfile) return []
    return options.branches.filter((branch) => activeProfile.allowedBranchIds.includes(branch.id))
  }, [activeProfile, options])

  const profileOptions = useMemo(
    () =>
      options?.profiles.map((profile) => ({
        id: profile.userName,
        label: profile.displayName,
        group: profile.role,
      })) ?? [],
    [options?.profiles],
  )

  const submit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await etOpsApi.login({ userName, branchId })
      onLogin(result)
    } catch {
      setError('Bu kullanici secilen sube/nokta icin yetkili degil.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const changeProfile = (nextUserName: string) => {
    const nextProfile = options?.profiles.find((profile) => profile.userName === nextUserName)
    setUserName(nextUserName)
    setBranchId(nextProfile?.defaultBranchId ?? '')
  }

  return (
    <main className="login-screen">
      <section className="login-hero">
        <div className="brand-block">
          <div className="brand-mark">E360</div>
          <div>
            <strong>EtOps 360</strong>
            <span>Karkastan kasaya operasyon platformu</span>
          </div>
        </div>
        <h1>Sube, uretim, kalite ve finans tek yetkili oturumda</h1>
        <p>
          Kullanici rolune gore sube listesi, evraklar, mutabakatlar ve fire hareketleri sinirlanir.
          Uretim ortaminda bu ekran SSO/MFA ile beslenecek sekilde tasarlandi.
        </p>
        <div className="login-proof">
          <ShieldCheck size={18} />
          RBAC + sube/bölge veri kapsami icin hazir iskelet
        </div>
      </section>

      <section className="login-card">
        <div>
          <p className="eyebrow">Yetkili giris</p>
          <h2>Profil ve sube secin</h2>
        </div>

        <ComboField
          id="login-profile"
          label="Kullanici profili"
          value={userName}
          options={profileOptions}
          onChange={changeProfile}
        />
        <ComboField
          id="login-branch"
          label="Yetkili sube / nokta"
          value={branchId}
          options={allowedBranches}
          onChange={setBranchId}
        />

        {activeProfile ? (
          <div className="login-scope">
            <strong>{activeProfile.role}</strong>
            <span>{activeProfile.allowedBranchIds.length} veri kapsami yetkisi</span>
          </div>
        ) : null}

        {error ? <div className="inline-warning">{error}</div> : null}

        <button type="button" className="primary-action" onClick={submit} disabled={!options || isSubmitting}>
          <LogIn size={18} />
          {isSubmitting ? 'Giris yapiliyor' : 'Giris yap'}
        </button>
      </section>
    </main>
  )
}
