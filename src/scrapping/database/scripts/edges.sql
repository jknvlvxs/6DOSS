SELECT a1.id as artist1_id, a2.id as artist2_id, AVG(t.popularity) AS average_popularity, a1.name AS artist1, a2.name AS artist2, string_agg(t.name, ', ') AS track_names, count(t.id) AS track_total
FROM artists_tracks at1
JOIN artists_tracks at2 ON at1."tracksId" = at2."tracksId" AND at1."artistsId" <> at2."artistsId"
JOIN tracks t ON at1."tracksId" = t."id"
JOIN artists a1 ON at1."artistsId" = a1."id"
JOIN artists a2 ON at2."artistsId" = a2."id"
WHERE a1.id < a2.id
GROUP BY a1.id, a2.id
ORDER BY average_popularity DESC;
