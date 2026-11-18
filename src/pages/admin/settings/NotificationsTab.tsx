import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleRow from "../../../components/ToggleRow";

export default function NotificationsTab() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<boolean>(true);
  const [digest, setDigest] = useState<boolean>(false);
  const [mentions, setMentions] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Programmatic navigation after a form submit; `state` carries a one-time message to the Overview page.
    navigate("/admin", { state: { flash: "Notification preferences saved." } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <ToggleRow label="Order updates" hint="New orders and refunds" checked={orders} onChange={setOrders} />
      <ToggleRow label="Weekly digest" hint="A summary every Monday" checked={digest} onChange={setDigest} />
      <ToggleRow label="Mentions" hint="When a teammate mentions you" checked={mentions} onChange={setMentions} />
      <button type="submit" className="focus-ring mt-1 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">Save and return to overview</button>
    </form>
  );
}
