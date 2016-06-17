export default function NotesTab(props) {
  return <div className="row">
    <div className="col-xs-12">
      <textarea
        cols={80}
        rows={10}
        onChange={(evt) => setValue('notes', evt.target.value)}
      >
        {props.image.notes}
      </textarea>
    </div>
  </div>;
}