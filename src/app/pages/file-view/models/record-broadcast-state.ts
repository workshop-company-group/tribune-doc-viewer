// state description
// - null: recording and broadcasting are disabled
// - 'broadcasting': broadcasting is enabled, recording is disabled
// - 'recording': broadcasting and recording are enabled
// - 'paused': broadcasting is enabled, recording is paused
export type RecordBroadcastState = null | 'broadcasting' | 'recording' | 'paused';
