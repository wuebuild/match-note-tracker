'use client';

import { syncNotes } from "@/service/notesService";
import { loadNotes } from "@/utlis/storage/notes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function NotesSyncer() {
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    syncNotesList()
  }, []);

  useEffect(() => {
    if (loading) { toast.info('Syncing notes ...'); }
  }, [loading])

  const syncNotesList = async () => {
    const notes = await loadNotes() || []
    if (notes.length > 0) {
      const session = localStorage.getItem('mgm_access_token')
      if (session) {
          setLoading(true)
          syncNotes()
          .then((msg) => {setLoading(false); toast.success('Sync Done'); window.location.reload()})
          .catch((err) => {setLoading(false); toast.error("Sync failed")});
      }
    }
  }

  return null;
}