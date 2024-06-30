namespace OrgChart.Models
{
    public class Person
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; } // If you want to include last names separately
        public string Position { get; set; }
        public string Image { get; set; }
        public string OfficeLeader { get; set; }
    }
}
